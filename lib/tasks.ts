"use client";

import { supabase } from "./supabase";

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
