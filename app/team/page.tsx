"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  getWorkers,
  getActiveTasksForAssignee,
  type WorkerSummary,
  type WorkloadLevel,
  type AssigneeActiveTask,
  type TaskStatus,
} from "@/lib/tasks";

type SortType = "load" | "name";

type Member = WorkerSummary;

const WORKLOAD_COLOR: Record<WorkloadLevel, string> = {
  normal: "#16A34A",
  high: "#F59E0B",
  overload: "#DC2626",
};

export default function TeamPage() {
  const router = useRouter();
  const [sort, setSort] = useState<SortType>("load");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [memberTasks, setMemberTasks] = useState<AssigneeActiveTask[]>([]);
  const [tasksLoading, setTasksLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      if (!u) {
        router.replace("/");
        return;
      }
      if (u.role !== "manager") {
        router.replace("/home");
        return;
      }
      const list = await getWorkers();
      setMembers(list);
      setLoading(false);
    })();
  }, [router]);

  const sortedMembers = [...members].sort((a, b) => {
    if (sort === "load") return a.taskCount - b.taskCount;
    return a.name.localeCompare(b.name, "ko");
  });

  const openMemberTasks = async (member: Member) => {
    setSelectedMember(member);
    setTasksLoading(true);
    setMemberTasks([]);
    const tasks = await getActiveTasksForAssignee(member.id);
    setMemberTasks(tasks);
    setTasksLoading(false);
  };

  const closeMemberTasks = () => {
    setSelectedMember(null);
    setMemberTasks([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9ff] flex items-center justify-center">
        <p className="text-sm text-gray-500">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#f9f9ff] text-[#131c2b] pb-[80px] flex flex-col"
      style={{ fontFamily: "var(--font-hanken), sans-serif" }}
    >
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 right-0 h-[56px] flex justify-between items-center px-4 z-50 bg-white border-b border-[#c3c6d6] max-w-screen-sm mx-auto">
        <div className="flex flex-col">
          <h1 className="text-[24px] leading-[28px] font-bold tracking-[-0.02em] text-[#003d9b]">
            팀원
          </h1>
          <span className="text-[12px] text-[#434654] leading-none mt-0.5">
            배관 1팀 · {members.length}명
          </span>
        </div>
        <button className="relative p-2 rounded-full hover:bg-[#f0f3ff] transition-colors active:scale-95">
          <span className="material-symbols-outlined text-[#003d9b]">doorbell</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white" />
        </button>
      </header>

      {/* Content */}
      <section
        className="flex-1 pt-[56px] max-w-screen-sm mx-auto w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {/* List Controls */}
        <div className="flex justify-between items-center px-4 py-4">
          <span className="text-[14px] font-bold text-[#131c2b]">팀원 {members.length}명</span>
          <div className="flex bg-[#e8eeff] p-1 rounded-lg">
            <button
              onClick={() => setSort("load")}
              className={`text-[14px] px-3 py-1 rounded-md transition-all ${
                sort === "load"
                  ? "bg-white text-[#003d9b] font-bold shadow-sm"
                  : "text-[#434654]"
              }`}
            >
              부담 적은 순
            </button>
            <button
              onClick={() => setSort("name")}
              className={`text-[14px] px-3 py-1 rounded-md transition-all ${
                sort === "name"
                  ? "bg-white text-[#003d9b] font-bold shadow-sm"
                  : "text-[#434654]"
              }`}
            >
              이름순
            </button>
          </div>
        </div>

        {/* Member List */}
        <div className="px-4 flex flex-col gap-4">
          {sortedMembers.map((m) => (
            <MemberCard key={m.id} member={m} onShowTasks={() => openMemberTasks(m)} />
          ))}
        </div>
      </section>

      {selectedMember && (
        <MemberTasksSheet
          member={selectedMember}
          tasks={memberTasks}
          loading={tasksLoading}
          onClose={closeMemberTasks}
          onAssign={() => {
            closeMemberTasks();
            router.push(`/assign/${selectedMember.id}`);
          }}
        />
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-[#E2E8F0] flex items-center px-0 z-50 max-w-screen-sm mx-auto">
        <div className="flex w-full h-full">
          <BottomTab icon="home" label="홈" active={false} onClick={() => router.push("/home_admin")} />
          <BottomTab icon="group" label="팀원" active={true} />
          <BottomTab icon="description" label="도면" active={false} onClick={() => router.push("/drawing")} />
          <BottomTab icon="chat" label="메시지" active={false} badge={3} onClick={() => router.push("/message_admin")} />
        </div>
      </nav>
    </div>
  );
}

const TASK_STATUS_UI: Record<
  TaskStatus,
  { label: string; bg: string; text: string }
> = {
  waiting: { label: "대기", bg: "#F1F5F9", text: "#475569" },
  in_progress: { label: "진행 중", bg: "#DBEAFE", text: "#1D4ED8" },
  submitted: { label: "검토 대기", bg: "#D1FAE5", text: "#047857" },
  rework: { label: "재작업", bg: "#FEE2E2", text: "#B91C1C" },
  approved: { label: "완료", bg: "#DCFCE7", text: "#15803D" },
};

function MemberCard({
  member,
  onShowTasks,
}: {
  member: Member;
  onShowTasks: () => void;
}) {
  const router = useRouter();
  const isOverload = member.workload === "overload";
  const dotColor = WORKLOAD_COLOR[member.workload];

  const avatarBg = isOverload
    ? "#ffdad6"
    : member.isNew
      ? "#b2c5ff"
      : "#e0e8fe";
  const avatarText = isOverload ? "#ba1a1a" : member.isNew ? "#003d9b" : "#434654";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onShowTasks}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onShowTasks();
        }
      }}
      className="bg-white p-5 rounded-xl border border-[#c3c6d6] shadow-sm flex flex-col gap-4 cursor-pointer hover:border-[#0052cc]/40 transition-colors active:scale-[0.99]"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
            style={{ backgroundColor: avatarBg, color: avatarText }}
          >
            {member.initial}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className={`text-[18px] leading-6 font-semibold ${isOverload ? "font-bold" : ""}`}
                style={{ color: isOverload ? "#ba1a1a" : "#131c2b" }}
              >
                {member.name}
              </span>
              {member.isNew && (
                <span className="bg-[#FEF3C7] text-[#92400E] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                  신규
                </span>
              )}
            </div>
            <span
              className="text-[14px]"
              style={{ color: isOverload ? "#ba1a1a" : "#434654" }}
            >
              작업 {member.taskCount}건{isOverload ? " (과부하)" : ""}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="채팅"
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#c3c6d6] hover:bg-[#f0f3ff] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[#434654]">chat</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/assign/${member.id}`);
            }}
            className="flex items-center gap-1 px-3 h-10 rounded-lg bg-[#0052cc] text-white font-bold text-[14px] hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-white text-[18px]">add</span>
            작업 부여
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between w-full rounded-lg border border-[#e8eeff] bg-[#f8faff] px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }} />
          <span className="text-[14px] font-medium text-[#0E1726]">
            진행 작업 {member.taskCount}건
          </span>
        </div>
        <span className="material-symbols-outlined text-[#0052cc] text-[20px]">
          chevron_right
        </span>
      </div>
    </article>
  );
}

function MemberTasksSheet({
  member,
  tasks,
  loading,
  onClose,
  onAssign,
}: {
  member: Member;
  tasks: AssigneeActiveTask[];
  loading: boolean;
  onClose: () => void;
  onAssign: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center max-w-screen-sm mx-auto">
      <button
        type="button"
        className="absolute inset-0 bg-[#0E1726]/60"
        style={{ backdropFilter: "blur(2px)" }}
        aria-label="닫기"
        onClick={onClose}
      />
      <div
        className="relative w-full bg-white rounded-t-[20px] flex flex-col"
        style={{
          maxHeight: "min(720px, 85vh)",
          boxShadow: "0 -8px 24px rgba(0,0,0,0.15)",
        }}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-[40px] h-[4px] bg-[#CBD5E1] rounded-full" />
        </div>

        <header className="flex items-center justify-between px-4 pb-4 border-b border-[#E2E8F0]">
          <div className="flex flex-col">
            <h2 className="text-[20px] font-bold text-[#003d9b] leading-tight">
              {member.name} · 진행 작업
            </h2>
            <span className="text-[13px] text-[#475569] mt-0.5">
              {member.affiliation ?? "—"} · {member.taskCount}건
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f0f3ff]"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined text-[#475569]">close</span>
          </button>
        </header>

        <main
          className="flex-1 overflow-y-auto px-4 py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {loading ? (
            <p className="text-center text-sm text-[#475569] py-10">불러오는 중...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-sm text-[#475569] py-10">
              진행 중인 작업이 없습니다.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {tasks.map((task) => {
                const statusUi = TASK_STATUS_UI[task.status];
                return (
                  <li
                    key={task.id}
                    className="rounded-xl border border-[#c3c6d6] p-4 bg-[#fafbff]"
                  >
                    <MemberTaskRow task={task} statusUi={statusUi} />
                  </li>
                );
              })}
            </ul>
          )}
        </main>

        <footer className="px-4 py-4 border-t border-[#E2E8F0] flex gap-2 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border border-[#CBD5E1] text-[14px] font-semibold text-[#475569]"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={onAssign}
            className="flex-1 h-11 rounded-xl bg-[#0052cc] text-white text-[14px] font-bold"
          >
            작업 부여
          </button>
        </footer>
      </div>
    </div>
  );
}

function MemberTaskRow({
  task,
  statusUi,
}: {
  task: AssigneeActiveTask;
  statusUi: { label: string; bg: string; text: string };
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[15px] font-bold text-[#131c2b] leading-snug flex-1">
          {task.title}
        </h3>
        <span
          className="text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: statusUi.bg, color: statusUi.text }}
        >
          {statusUi.label}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 text-[12px] text-[#434654]">
        {task.drawingCode && (
          <span
            className="px-2 py-0.5 rounded bg-white border border-[#e2e8f0]"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            {task.drawingCode}
          </span>
        )}
        {task.zone && <span>{task.zone}</span>}
        {task.priority === "urgent" && (
          <span className="text-[#b91c1c] font-semibold">긴급</span>
        )}
      </div>
      {task.feedback && (
        <p className="mt-2 text-[12px] text-[#b91c1c] bg-[#fef2f2] rounded-lg px-2 py-1.5 leading-relaxed">
          <span className="font-semibold">{task.feedback.author}:</span>{" "}
          {task.feedback.message}
        </p>
      )}
    </>
  );
}

function BottomTab({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  badge?: number;
  onClick?: () => void;
}) {
  const color = active ? "#0052CC" : "#94A3B8";
  return (
    <button
      onClick={onClick}
      className="flex-1 flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
    >
      <div className="relative flex flex-col items-center">
        <span
          className="material-symbols-outlined text-[22px]"
          style={{ color, fontVariationSettings: active ? "'FILL' 1" : undefined }}
        >
          {icon}
        </span>
        {badge && (
          <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] flex items-center justify-center bg-[#DC2626] text-white text-[10px] font-bold rounded-full px-1">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[12px] font-medium leading-none" style={{ color }}>
        {label}
      </span>
    </button>
  );
}
