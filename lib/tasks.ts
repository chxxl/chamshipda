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
    .neq("status", "approved")
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
