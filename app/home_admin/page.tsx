"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, type AuthUser } from "@/lib/auth";
import {
  getProgressStats,
  getRecentActivity,
  getReviewQueueStats,
  getTeamWorkloadStats,
  formatRelativeTime,
  type ProgressStats,
  type RecentActivityItem,
  type ReviewQueueStats,
  type TeamWorkloadStats,
} from "@/lib/tasks";

type AdminTab = "home" | "team" | "drawings" | "messages";

export default function HomeAdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("home");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [reviewStats, setReviewStats] = useState<ReviewQueueStats>({
    total: 0,
    urgent: 0,
    rework: 0,
    normal: 0,
  });
  const [progress, setProgress] = useState<ProgressStats>({
    approved: 0,
    total: 0,
    percent: 0,
  });
  const [workload, setWorkload] = useState<TeamWorkloadStats>({
    members: [],
    averageCount: 0,
    busiest: null,
    freest: null,
  });
  const [activity, setActivity] = useState<RecentActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

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
      setUser(u);
      const [rs, ps, ws, ra] = await Promise.all([
        getReviewQueueStats(),
        getProgressStats(),
        getTeamWorkloadStats(),
        getRecentActivity(5),
      ]);
      setReviewStats(rs);
      setProgress(ps);
      setWorkload(ws);
      setActivity(ra);
      setLoading(false);
    })();
  }, [router]);

  const today = new Date();
  const dateStr = `${today.getMonth() + 1}월 ${today.getDate()}일 (${["일", "월", "화", "수", "목", "금", "토"][today.getDay()]})`;

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#f9f9ff] flex items-center justify-center">
        <p className="text-sm text-gray-500">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#131c2b] pb-[64px]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
      <header className="fixed top-0 left-0 right-0 h-[56px] flex items-center justify-between px-4 z-50 bg-[#f9f9ff] border-b border-[#c3c6d6] max-w-screen-sm mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0052cc] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] text-[#131c2b] leading-tight font-semibold">{user.name}님</span>
            <span className="text-[11px] text-[#434654]">{user.team ?? "—"} · {dateStr}</span>
          </div>
        </div>
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e0e8fe] transition-colors">
          <span className="material-symbols-outlined text-[#003d9b]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#fe6b00] rounded-full border border-[#f9f9ff]" />
        </button>
      </header>

      <main className="pt-[56px] px-4 pb-6 max-w-screen-sm mx-auto w-full">
        <section className="mt-6 mb-4">
          <h1 className="text-[24px] leading-[32px] font-bold tracking-[-0.02em] text-[#003d9b]">오늘 현황</h1>
        </section>

        <div className="grid grid-cols-1 gap-4">
          {/* Card 1: 검토 대기 */}
          <div className="bg-white rounded-xl border border-[#c3c6d6] border-l-[4px] border-l-[#ba1a1a] p-5 flex flex-col gap-3 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[18px] leading-6 font-semibold text-[#131c2b]">검토 대기</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-[32px] leading-[40px] font-bold tracking-[-0.03em] text-[#ba1a1a]">{reviewStats.total}</span>
                  <span className="text-[16px] text-[#434654]">건</span>
                </div>
              </div>
              <button
                onClick={() => router.push("/review")}
                className="text-[#003d9b] text-[14px] flex items-center gap-1 hover:bg-[#f0f3ff] p-1 rounded-lg"
              >
                지금 확인하기
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
            {reviewStats.total > 0 && (
              <div className="flex flex-wrap gap-2">
                {reviewStats.urgent > 0 && (
                  <span
                    className="px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-medium tracking-[0.02em]"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    긴급 {reviewStats.urgent}
                  </span>
                )}
                {reviewStats.rework > 0 && (
                  <span
                    className="px-3 py-1 rounded-full bg-[#ffdbcc] text-[#572000] text-[11px] font-medium tracking-[0.02em]"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    재작업 {reviewStats.rework}
                  </span>
                )}
                {reviewStats.normal > 0 && (
                  <span
                    className="px-3 py-1 rounded-full bg-[#dae2f8] text-[#434654] text-[11px] font-medium tracking-[0.02em]"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    일반 {reviewStats.normal}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Card 2: 진행률 */}
          <div className="bg-white rounded-xl border border-[#c3c6d6] p-5 flex flex-col gap-4 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-[18px] leading-6 font-semibold text-[#131c2b]">진행률</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <span className="text-[32px] leading-[40px] font-bold tracking-[-0.03em] text-[#003d9b]">{progress.percent}%</span>
                <span className="text-[14px] text-[#434654]">{progress.approved} / {progress.total}건 완료</span>
              </div>
              <div className="w-full h-3 bg-[#e8eeff] rounded-full overflow-hidden">
                <div className="h-full bg-[#0052cc] rounded-full transition-all" style={{ width: `${progress.percent}%` }} />
              </div>
            </div>
          </div>

          {/* Card 3: 팀 진행 현황 */}
          <div className="bg-white rounded-xl border border-[#c3c6d6] p-5 flex flex-col gap-4 shadow-sm">
            <div>
              <span className="text-[13px] font-medium text-[#475569]">팀 진행 현황</span>
            </div>
            <div>
              <span className="text-[16px] font-medium text-[#0E1726]">
                평균 진행 {workload.averageCount}건
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] text-[#475569]">가장 바쁨</span>
                <span className="text-[14px] font-medium text-[#DC2626]">
                  {workload.busiest ? `${workload.busiest.name} (${workload.busiest.activeCount}건)` : "—"}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] text-[#475569]">가장 여유</span>
                <span className="text-[14px] font-medium text-[#16A34A]">
                  {workload.freest ? `${workload.freest.name} (${workload.freest.activeCount}건)` : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <section className="mt-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[18px] leading-6 font-semibold text-[#131c2b]">최근 활동</h2>
              <span className="material-symbols-outlined text-[#434654]">more_horiz</span>
            </div>
            {activity.length === 0 ? (
              <div className="text-center py-8 text-[#94A3B8] text-[13px]">최근 활동이 없습니다</div>
            ) : (
              <div className="space-y-3">
                {activity.map((a) => (
                  <ActivityItem key={a.id} item={a} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white h-[64px] border-t border-[#E2E8F0] max-w-screen-sm mx-auto">
        <div className="flex w-full h-full">
          <NavTab label="홈" icon="home" active={activeTab === "home"} onClick={() => setActiveTab("home")} />
          <NavTab label="팀원" icon="group" active={activeTab === "team"} onClick={() => { setActiveTab("team"); router.push("/team"); }} />
          <NavTab label="도면" icon="description" active={activeTab === "drawings"} onClick={() => { setActiveTab("drawings"); router.push("/drawing"); }} />
          <NavTab label="메시지" icon="chat_bubble" active={activeTab === "messages"} badge={3} onClick={() => { setActiveTab("messages"); router.push("/message_admin"); }} />
        </div>
      </nav>
    </div>
  );
}

function ActivityItem({ item }: { item: RecentActivityItem }) {
  const config = ACTIVITY_CONFIG[item.type];
  return (
    <div className="flex items-start gap-4 p-3 bg-white rounded-xl border border-[#c3c6d6] shadow-sm">
      <div
        className="w-8 h-8 rounded-full bg-[#e0e8fe] flex items-center justify-center shrink-0"
        style={{ color: config.color }}
      >
        <span className="material-symbols-outlined text-[18px]">{config.icon}</span>
      </div>
      <div className="flex flex-col">
        <p className="text-[14px] text-[#131c2b] leading-tight">
          {item.authorName}님이{" "}
          <span className="font-bold text-[#003d9b]">{item.taskTitle}</span>
          {" "}{config.verb}
        </p>
        <span className="text-[12px] text-[#434654] mt-1">{formatRelativeTime(item.at)}</span>
      </div>
    </div>
  );
}

const ACTIVITY_CONFIG: Record<RecentActivityItem["type"], { icon: string; color: string; verb: string }> = {
  submission: { icon: "task_alt", color: "#0052cc", verb: "작업 완료 신청" },
  approval: { icon: "check_circle", color: "#16A34A", verb: "작업 승인됨" },
  rejection: { icon: "cancel", color: "#DC2626", verb: "작업 반려됨" },
};

function NavTab({
  label,
  icon,
  active,
  badge,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center transition-colors ${
        active ? "text-[#0052CC]" : "text-[#94A3B8]"
      }`}
    >
      <div className="relative inline-flex flex-col items-center">
        <span
          className="material-symbols-outlined text-[22px]"
          style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {icon}
        </span>
        {badge && (
          <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#DC2626] text-white text-[10px] flex items-center justify-center rounded-full font-bold">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[12px] font-medium mt-0.5">{label}</span>
    </button>
  );
}
