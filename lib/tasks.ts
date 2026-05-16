"use client";

import { supabase } from "./supabase";

// ============================================================
// 작업자 / 도면 / 작업 생성
// ============================================================

export type WorkloadLevel = "normal" | "high" | "overload";

export interface WorkerSummary {
  id: string;
  name: string;
  initial: string;
  affiliation: string | null;
  isNew: boolean;
  taskCount: number;
  workload: WorkloadLevel;
}

function classifyWorkload(count: number): WorkloadLevel {
  if (count >= 7) return "overload";
  if (count >= 4) return "high";
  return "normal";
}

/** /team 페이지용: 작업자 목록 + 각자의 active task 수 */
export async function getWorkers(): Promise<WorkerSummary[]> {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
        id, name, initial, affiliation, is_new,
        tasks!tasks_assignee_id_fkey(status)
      `
    )
    .eq("role", "worker")
    .order("name");

  if (error || !data) {
    console.error("getWorkers error:", error);
    return [];
  }

  return data.map((u): WorkerSummary => {
    const active = (u.tasks as { status: string }[] | null ?? []).filter(
      (t) => t.status === "waiting" || t.status === "in_progress" || t.status === "rework"
    ).length;
    return {
      id: u.id,
      name: u.name,
      initial: u.initial,
      affiliation: u.affiliation,
      isNew: u.is_new,
      taskCount: active,
      workload: classifyWorkload(active),
    };
  });
}

export interface DrawingSummary {
  id: string;
  code: string;
  title: string;
  file_url: string | null;
}

/** /assign 페이지의 도면 피커용 + /drawing 목록용 */
export async function getDrawings(): Promise<DrawingSummary[]> {
  const { data, error } = await supabase
    .from("drawings")
    .select("id, code, title, file_url")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as DrawingSummary[];
}

/** 도면 이미지를 Storage 'drawings' 버킷에 업로드 후 public URL 반환 */
export async function uploadDrawingImage(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from("drawings")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (upErr) {
    console.error("uploadDrawingImage error:", upErr);
    return null;
  }

  const { data } = supabase.storage.from("drawings").getPublicUrl(path);
  return data.publicUrl;
}

/** file_url에서 Storage 경로 추출 (삭제용) */
function extractStoragePath(fileUrl: string): string | null {
  const marker = "/storage/v1/object/public/drawings/";
  const idx = fileUrl.indexOf(marker);
  if (idx === -1) return null;
  return fileUrl.slice(idx + marker.length);
}

export interface CreateDrawingInput {
  code: string;
  title: string;
  fileUrl: string | null;
  uploadedBy: string;
}

export async function createDrawing(input: CreateDrawingInput): Promise<DrawingSummary | null> {
  const { data, error } = await supabase
    .from("drawings")
    .insert({
      code: input.code,
      title: input.title,
      file_url: input.fileUrl,
      uploaded_by: input.uploadedBy,
    })
    .select("id, code, title, file_url")
    .maybeSingle();
  if (error || !data) {
    console.error("createDrawing error:", error);
    return null;
  }
  return data as DrawingSummary;
}

export interface UpdateDrawingInput {
  code?: string;
  title?: string;
  fileUrl?: string | null;
}

export async function updateDrawing(
  id: string,
  input: UpdateDrawingInput
): Promise<boolean> {
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (input.code !== undefined) updates.code = input.code;
  if (input.title !== undefined) updates.title = input.title;
  if (input.fileUrl !== undefined) updates.file_url = input.fileUrl;

  const { error } = await supabase.from("drawings").update(updates).eq("id", id);
  if (error) {
    console.error("updateDrawing error:", error);
    return false;
  }
  return true;
}

/** 도면 삭제: drawings 행 삭제 + Storage 파일 삭제 (best effort) */
export async function deleteDrawing(id: string, fileUrl: string | null): Promise<boolean> {
  if (fileUrl) {
    const path = extractStoragePath(fileUrl);
    if (path) {
      await supabase.storage.from("drawings").remove([path]);
    }
  }
  const { error } = await supabase.from("drawings").delete().eq("id", id);
  if (error) {
    console.error("deleteDrawing error:", error);
    return false;
  }
  return true;
}

/** ID 한 건 (assign 페이지 받는사람 정보용) */
export async function getUserById(userId: string): Promise<{
  id: string;
  name: string;
  initial: string;
  affiliation: string | null;
} | null> {
  const { data } = await supabase
    .from("users")
    .select("id, name, initial, affiliation")
    .eq("id", userId)
    .maybeSingle();
  return data;
}

export interface CreateTaskInput {
  title: string;
  assigneeId: string;
  assignedBy: string;
  drawingId: string | null;
  details?: string;
  priority?: TaskPriority;
}

/** /assign 작업 부여: tasks 테이블에 새 행 insert */
export async function createTask(input: CreateTaskInput): Promise<boolean> {
  const { error } = await supabase.from("tasks").insert({
    title: input.title,
    assignee_id: input.assigneeId,
    assigned_by: input.assignedBy,
    drawing_id: input.drawingId,
    details: input.details ?? null,
    priority: input.priority ?? "normal",
    status: "waiting",
  });
  if (error) {
    console.error("createTask error:", error);
    return false;
  }
  return true;
}

export type TaskStatus =
  | "waiting"
  | "in_progress"
  | "submitted"
  | "rework"
  | "approved";

export type TaskPriority = "normal" | "urgent";

export interface HomeTask {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  feedback?: { author: string; message: string };
}

/**
 * 작업자 홈 화면용: 본인에게 할당된 모든 작업 (approved 제외)
 * rework 상태인 경우 가장 최근 반려 피드백 함께 반환
 */
export async function getHomeTasksForUser(userId: string): Promise<HomeTask[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
        id,
        title,
        status,
        priority,
        submissions:task_submissions(
          review_status,
          reviewed_at,
          rejection_detail,
          reviewer:users!task_submissions_reviewer_id_fkey(name)
        )
      `
    )
    .eq("assignee_id", userId)
    .in("status", ["waiting", "in_progress", "rework"])
    .order("priority", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getHomeTasksForUser error:", error);
    return [];
  }

  return (data ?? []).map((row): HomeTask => {
    const task: HomeTask = {
      id: row.id,
      title: row.title,
      status: row.status,
      priority: row.priority,
    };

    if (row.status === "rework") {
      const latestRejection = (row.submissions ?? [])
        .filter(
          (s: { review_status: string; reviewed_at: string | null }) =>
            s.review_status === "rejected"
        )
        .sort(
          (
            a: { reviewed_at: string | null },
            b: { reviewed_at: string | null }
          ) => (b.reviewed_at ?? "").localeCompare(a.reviewed_at ?? "")
        )[0];

      if (latestRejection?.rejection_detail) {
        const reviewer = (latestRejection.reviewer as { name?: string } | null)
          ?.name;
        task.feedback = {
          author: reviewer ?? "검토자",
          message: latestRejection.rejection_detail,
        };
      }
    }

    return task;
  });
}

/** 관리자 팀원 화면: 특정 작업자의 진행 중 작업 목록 */
export interface AssigneeActiveTask {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  zone: string | null;
  drawingCode: string | null;
  feedback?: { author: string; message: string };
}

export async function getActiveTasksForAssignee(
  userId: string
): Promise<AssigneeActiveTask[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
        id,
        title,
        status,
        priority,
        zone,
        drawing:drawings(code),
        submissions:task_submissions(
          review_status,
          reviewed_at,
          rejection_detail,
          reviewer:users!task_submissions_reviewer_id_fkey(name)
        )
      `
    )
    .eq("assignee_id", userId)
    .in("status", ["waiting", "in_progress", "rework"])
    .order("priority", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getActiveTasksForAssignee error:", error);
    return [];
  }

  return (data ?? []).map((row): AssigneeActiveTask => {
    const drawing = row.drawing as { code?: string } | null;
    const task: AssigneeActiveTask = {
      id: row.id,
      title: row.title,
      status: row.status,
      priority: row.priority,
      zone: row.zone,
      drawingCode: drawing?.code ?? null,
    };

    if (row.status === "rework") {
      const latestRejection = (row.submissions ?? [])
        .filter(
          (s: { review_status: string; reviewed_at: string | null }) =>
            s.review_status === "rejected"
        )
        .sort(
          (
            a: { reviewed_at: string | null },
            b: { reviewed_at: string | null }
          ) => (b.reviewed_at ?? "").localeCompare(a.reviewed_at ?? "")
        )[0];

      if (latestRejection?.rejection_detail) {
        const reviewer = (latestRejection.reviewer as { name?: string } | null)
          ?.name;
        task.feedback = {
          author: reviewer ?? "검토자",
          message: latestRejection.rejection_detail,
        };
      }
    }

    return task;
  });
}

/** 완료된(approved) 작업 카운트 */
export async function getApprovedCount(userId: string): Promise<number> {
  const { count } = await supabase
    .from("tasks")
    .select("id", { count: "exact", head: true })
    .eq("assignee_id", userId)
    .eq("status", "approved");
  return count ?? 0;
}

export interface MaterialItem {
  key: string;
  label: string;
}

export interface WorkTaskDetail {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  zone: string | null;
  caution_title: string | null;
  caution_subtitle: string | null;
  details: string | null;
  materials: MaterialItem[];
  estimated_minutes: number | null;
  deadline: string | null;
  assignee_id: string;
  drawing: { id: string; code: string; title: string; file_url: string | null } | null;
  feedback?: { author: string; message: string };
}

/** /work 페이지용: ID 한 건의 전체 정보 + 최근 반려 피드백 */
export async function getTaskById(taskId: string): Promise<WorkTaskDetail | null> {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
        id, title, status, priority, zone,
        caution_title, caution_subtitle, details,
        materials, estimated_minutes, deadline, assignee_id,
        drawing:drawings(id, code, title, file_url),
        submissions:task_submissions(
          review_status,
          reviewed_at,
          rejection_detail,
          reviewer:users!task_submissions_reviewer_id_fkey(name)
        )
      `
    )
    .eq("id", taskId)
    .maybeSingle();

  if (error || !data) {
    if (error) console.error("getTaskById error:", error);
    return null;
  }

  const detail: WorkTaskDetail = {
    id: data.id,
    title: data.title,
    status: data.status,
    priority: data.priority,
    zone: data.zone,
    caution_title: data.caution_title,
    caution_subtitle: data.caution_subtitle,
    details: data.details,
    materials: (data.materials as MaterialItem[]) ?? [],
    estimated_minutes: data.estimated_minutes,
    deadline: data.deadline,
    assignee_id: data.assignee_id,
    drawing: (data.drawing as WorkTaskDetail["drawing"]) ?? null,
  };

  if (data.status === "rework") {
    const latestRejection = (data.submissions ?? [])
      .filter(
        (s: { review_status: string; reviewed_at: string | null }) =>
          s.review_status === "rejected"
      )
      .sort(
        (
          a: { reviewed_at: string | null },
          b: { reviewed_at: string | null }
        ) => (b.reviewed_at ?? "").localeCompare(a.reviewed_at ?? "")
      )[0];

    if (latestRejection?.rejection_detail) {
      const reviewer = (latestRejection.reviewer as { name?: string } | null)?.name;
      detail.feedback = {
        author: reviewer ?? "검토자",
        message: latestRejection.rejection_detail,
      };
    }
  }

  return detail;
}

/** waiting → in_progress 로 전환 (이미 진행 중/재작업/완료 등이면 변경 안 함) */
export async function markInProgress(taskId: string): Promise<void> {
  await supabase
    .from("tasks")
    .update({ status: "in_progress", updated_at: new Date().toISOString() })
    .eq("id", taskId)
    .eq("status", "waiting");
}

/** 작업 완료 신청: task_submissions 행 추가 + tasks.status = 'submitted' */
export async function submitTask(taskId: string, userId: string): Promise<boolean> {
  const { error: insertError } = await supabase
    .from("task_submissions")
    .insert({
      task_id: taskId,
      submitted_by: userId,
      review_status: "pending",
    });
  if (insertError) {
    console.error("submitTask insert error:", insertError);
    return false;
  }

  const { error: updateError } = await supabase
    .from("tasks")
    .update({ status: "submitted", updated_at: new Date().toISOString() })
    .eq("id", taskId);
  if (updateError) {
    console.error("submitTask update error:", updateError);
    return false;
  }

  return true;
}

export type ReviewCardType = "urgent" | "rework" | "normal";

export interface PendingReview {
  submissionId: string;
  taskId: string;
  taskTitle: string;
  authorName: string;
  authorInitial: string;
  submittedAt: string;
  drawingCode: string | null;
  drawingTitle: string | null;
  type: ReviewCardType;
  /** rework/urgent 카드의 기존 박반장 피드백 (이전 반려 사유) */
  previousFeedback?: { author: string; message: string };
}

/** /review 페이지용: 검토 대기 중인 모든 submission */
export async function getPendingReviews(): Promise<PendingReview[]> {
  const { data, error } = await supabase
    .from("task_submissions")
    .select(
      `
        id,
        submitted_at,
        author:users!task_submissions_submitted_by_fkey(name, initial),
        task:tasks(
          id,
          title,
          priority,
          drawing:drawings(code, title),
          all_submissions:task_submissions(
            review_status,
            reviewed_at,
            rejection_detail,
            reviewer:users!task_submissions_reviewer_id_fkey(name)
          )
        )
      `
    )
    .eq("review_status", "pending")
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("getPendingReviews error:", error);
    return [];
  }

  return (data ?? []).map((row): PendingReview => {
    const author = row.author as { name?: string; initial?: string } | null;
    const task = row.task as {
      id: string;
      title: string;
      priority: TaskPriority;
      drawing: { code: string; title: string } | null;
      all_submissions: {
        review_status: string;
        reviewed_at: string | null;
        rejection_detail: string | null;
        reviewer: { name?: string } | null;
      }[];
    } | null;

    const previousRejections = (task?.all_submissions ?? [])
      .filter((s) => s.review_status === "rejected")
      .sort((a, b) => (b.reviewed_at ?? "").localeCompare(a.reviewed_at ?? ""));

    const latestRejection = previousRejections[0];
    const hasReworkHistory = previousRejections.length > 0;

    let type: ReviewCardType = "normal";
    if (task?.priority === "urgent") type = "urgent";
    else if (hasReworkHistory) type = "rework";

    const card: PendingReview = {
      submissionId: row.id,
      taskId: task?.id ?? "",
      taskTitle: task?.title ?? "",
      authorName: author?.name ?? "?",
      authorInitial: author?.initial ?? "?",
      submittedAt: row.submitted_at,
      drawingCode: task?.drawing?.code ?? null,
      drawingTitle: task?.drawing?.title ?? null,
      type,
    };

    if (latestRejection?.rejection_detail) {
      card.previousFeedback = {
        author: latestRejection.reviewer?.name ?? "검토자",
        message: latestRejection.rejection_detail,
      };
    }

    return card;
  });
}

/** 검토 승인: submission + task 둘 다 'approved'로 */
export async function approveSubmission(
  submissionId: string,
  reviewerId: string
): Promise<boolean> {
  const { data: sub, error: subErr } = await supabase
    .from("task_submissions")
    .update({
      review_status: "approved",
      reviewer_id: reviewerId,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", submissionId)
    .select("task_id")
    .maybeSingle();

  if (subErr || !sub) {
    console.error("approveSubmission error:", subErr);
    return false;
  }

  const { error: taskErr } = await supabase
    .from("tasks")
    .update({ status: "approved", updated_at: new Date().toISOString() })
    .eq("id", sub.task_id);

  if (taskErr) {
    console.error("approveSubmission task update error:", taskErr);
    return false;
  }
  return true;
}

export interface RejectionInput {
  reason: string;
  detail: string;
  reworkDeadline?: string | null;
}

/** 검토 반려: submission rejected, task → rework */
export async function rejectSubmission(
  submissionId: string,
  reviewerId: string,
  input: RejectionInput
): Promise<boolean> {
  const { data: sub, error: subErr } = await supabase
    .from("task_submissions")
    .update({
      review_status: "rejected",
      reviewer_id: reviewerId,
      reviewed_at: new Date().toISOString(),
      rejection_reason: input.reason,
      rejection_detail: input.detail,
      rework_deadline: input.reworkDeadline ?? null,
    })
    .eq("id", submissionId)
    .select("task_id")
    .maybeSingle();

  if (subErr || !sub) {
    console.error("rejectSubmission error:", subErr);
    return false;
  }

  const { error: taskErr } = await supabase
    .from("tasks")
    .update({ status: "rework", updated_at: new Date().toISOString() })
    .eq("id", sub.task_id);

  if (taskErr) {
    console.error("rejectSubmission task update error:", taskErr);
    return false;
  }
  return true;
}

/** 상대 시간 포맷 ("10분 전", "2시간 전" 등) */
export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  if (diffMs < 0) return "방금 전";
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "방금 전";
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

// ============================================================
// /complete 페이지용
// ============================================================

export interface CompletedItem {
  taskId: string;
  title: string;
  approvedAt: string | null;
  reviewerName: string | null;
  approvalDetail: string | null;
}

/** /complete "승인됨" 탭: 작업자의 approved 작업들 */
export async function getApprovedTasksForUser(userId: string): Promise<CompletedItem[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
        id,
        title,
        updated_at,
        submissions:task_submissions(
          review_status,
          reviewed_at,
          rejection_detail,
          reviewer:users!task_submissions_reviewer_id_fkey(name)
        )
      `
    )
    .eq("assignee_id", userId)
    .eq("status", "approved")
    .order("updated_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row): CompletedItem => {
    const approvedSubmission = (row.submissions ?? [])
      .filter((s: { review_status: string }) => s.review_status === "approved")
      .sort(
        (
          a: { reviewed_at: string | null },
          b: { reviewed_at: string | null }
        ) => (b.reviewed_at ?? "").localeCompare(a.reviewed_at ?? "")
      )[0];
    return {
      taskId: row.id,
      title: row.title,
      approvedAt: approvedSubmission?.reviewed_at ?? row.updated_at,
      reviewerName:
        (approvedSubmission?.reviewer as { name?: string } | null)?.name ?? null,
      approvalDetail: null, // 승인은 detail 없음, 향후 확장 가능
    };
  });
}

export interface ReviewingItem {
  taskId: string;
  title: string;
  submittedAt: string;
}

/** /complete "검토 중" 탭: 작업자의 submitted 작업들 */
export async function getReviewingTasksForUser(userId: string): Promise<ReviewingItem[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select(
      `
        id,
        title,
        submissions:task_submissions(review_status, submitted_at)
      `
    )
    .eq("assignee_id", userId)
    .eq("status", "submitted")
    .order("updated_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row): ReviewingItem => {
    const pending = (row.submissions ?? [])
      .filter((s: { review_status: string }) => s.review_status === "pending")
      .sort(
        (
          a: { submitted_at: string },
          b: { submitted_at: string }
        ) => (b.submitted_at ?? "").localeCompare(a.submitted_at ?? "")
      )[0];
    return {
      taskId: row.id,
      title: row.title,
      submittedAt: pending?.submitted_at ?? new Date().toISOString(),
    };
  });
}

/** /complete + /home 통계용: 작업자별 활성/완료/재작업 카운트 */
export interface WorkerStats {
  active: number;
  approved: number;
  rework: number;
}
export async function getWorkerStats(userId: string): Promise<WorkerStats> {
  const { data } = await supabase
    .from("tasks")
    .select("status")
    .eq("assignee_id", userId);
  const rows = (data ?? []) as { status: TaskStatus }[];
  return {
    active: rows.filter(
      (r) => r.status === "waiting" || r.status === "in_progress" || r.status === "rework"
    ).length,
    approved: rows.filter((r) => r.status === "approved").length,
    rework: rows.filter((r) => r.status === "rework").length,
  };
}

// ============================================================
// /home_admin 대시보드용 통계
// ============================================================

export interface ReviewQueueStats {
  total: number;
  urgent: number;
  rework: number;
  normal: number;
}

/** /home_admin "검토 대기" 카드용 (전체/긴급/재작업/일반 카운트) */
export async function getReviewQueueStats(): Promise<ReviewQueueStats> {
  const reviews = await getPendingReviews();
  return {
    total: reviews.length,
    urgent: reviews.filter((r) => r.type === "urgent").length,
    rework: reviews.filter((r) => r.type === "rework").length,
    normal: reviews.filter((r) => r.type === "normal").length,
  };
}

export interface ProgressStats {
  approved: number;
  total: number;
  percent: number;
}

/** /home_admin "진행률" 카드용 (approved / total) */
export async function getProgressStats(): Promise<ProgressStats> {
  const [approvedRes, totalRes] = await Promise.all([
    supabase
      .from("tasks")
      .select("id", { count: "exact", head: true })
      .eq("status", "approved"),
    supabase.from("tasks").select("id", { count: "exact", head: true }),
  ]);
  const approved = approvedRes.count ?? 0;
  const total = totalRes.count ?? 0;
  const percent = total === 0 ? 0 : Math.round((approved / total) * 100);
  return { approved, total, percent };
}

export interface TeamMemberWorkload {
  userId: string;
  name: string;
  activeCount: number;
}

export interface TeamWorkloadStats {
  members: TeamMemberWorkload[];
  averageCount: number;
  busiest: TeamMemberWorkload | null;
  freest: TeamMemberWorkload | null;
}

/** /home_admin "팀 진행 현황" 카드용 (작업자별 진행 작업 수) */
export async function getTeamWorkloadStats(): Promise<TeamWorkloadStats> {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
        id,
        name,
        tasks!tasks_assignee_id_fkey(status)
      `
    )
    .eq("role", "worker");

  if (error || !data) {
    return { members: [], averageCount: 0, busiest: null, freest: null };
  }

  const members: TeamMemberWorkload[] = data.map((u) => {
    const activeCount = (u.tasks as { status: string }[] | null ?? []).filter(
      (t) => t.status === "waiting" || t.status === "in_progress" || t.status === "rework"
    ).length;
    return { userId: u.id, name: u.name, activeCount };
  });

  if (members.length === 0) {
    return { members: [], averageCount: 0, busiest: null, freest: null };
  }

  const sum = members.reduce((acc, m) => acc + m.activeCount, 0);
  const averageCount = Math.round((sum / members.length) * 10) / 10;
  const sorted = [...members].sort((a, b) => b.activeCount - a.activeCount);

  return {
    members,
    averageCount,
    busiest: sorted[0],
    freest: sorted[sorted.length - 1],
  };
}

export interface RecentActivityItem {
  id: string;
  authorName: string;
  taskTitle: string;
  type: "submission" | "approval" | "rejection";
  at: string;
}

/** /home_admin "최근 활동" 리스트용 (최신 submissions) */
export async function getRecentActivity(limit = 5): Promise<RecentActivityItem[]> {
  const { data, error } = await supabase
    .from("task_submissions")
    .select(
      `
        id,
        review_status,
        submitted_at,
        reviewed_at,
        author:users!task_submissions_submitted_by_fkey(name),
        task:tasks(title)
      `
    )
    .order("submitted_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data.map((row): RecentActivityItem => {
    const author = row.author as { name?: string } | null;
    const task = row.task as { title?: string } | null;
    const reviewed = !!row.reviewed_at;
    const type: RecentActivityItem["type"] = !reviewed
      ? "submission"
      : row.review_status === "approved"
        ? "approval"
        : "rejection";
    return {
      id: row.id,
      authorName: author?.name ?? "?",
      taskTitle: task?.title ?? "?",
      type,
      at: reviewed ? (row.reviewed_at ?? row.submitted_at) : row.submitted_at,
    };
  });
}
