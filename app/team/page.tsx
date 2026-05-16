"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getWorkers, type WorkerSummary, type WorkloadLevel } from "@/lib/tasks";

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
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      </section>

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

function MemberCard({ member }: { member: Member }) {
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
    <article className="bg-white p-5 rounded-xl border border-[#c3c6d6] shadow-sm flex flex-col gap-4">
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
            aria-label="채팅"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#c3c6d6] hover:bg-[#f0f3ff] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[#434654]">chat</span>
          </button>
          <button
            onClick={() => router.push(`/assign/${member.id}`)}
            className="flex items-center gap-1 px-3 h-10 rounded-lg bg-[#0052cc] text-white font-bold text-[14px] hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-white text-[18px]">add</span>
            작업 부여
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }} />
        <span className="text-[14px] font-medium text-[#0E1726]">
          진행 작업 {member.taskCount}건
        </span>
      </div>
    </article>
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
