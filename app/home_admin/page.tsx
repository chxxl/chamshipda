"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AdminTab = "home" | "team" | "drawings" | "messages";

export default function HomeAdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("home");

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#131c2b] pb-[64px]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 right-0 h-[56px] flex items-center justify-between px-4 z-50 bg-[#f9f9ff] border-b border-[#c3c6d6] max-w-screen-sm mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0052cc] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] text-[#131c2b] leading-tight font-semibold">박반장님</span>
            <span className="text-[11px] text-[#434654]">배관 1팀 · 5월 16일 (토)</span>
          </div>
        </div>
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e0e8fe] transition-colors">
          <span className="material-symbols-outlined text-[#003d9b]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#fe6b00] rounded-full border border-[#f9f9ff]" />
        </button>
      </header>

      <main className="pt-[56px] px-4 pb-6 max-w-screen-sm mx-auto w-full">
        {/* Page Title */}
        <section className="mt-6 mb-4">
          <h1 className="text-[24px] leading-[32px] font-bold tracking-[-0.02em] text-[#003d9b]">오늘 현황</h1>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4">
          {/* Card 1: 검토 대기 */}
          <div className="bg-white rounded-xl border border-[#c3c6d6] border-l-[4px] border-l-[#ba1a1a] p-5 flex flex-col gap-3 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[18px] leading-6 font-semibold text-[#131c2b]">검토 대기</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-[32px] leading-[40px] font-bold tracking-[-0.03em] text-[#ba1a1a]">8</span>
                  <span className="text-[16px] text-[#434654]">건</span>
                </div>
              </div>
              <button className="text-[#003d9b] text-[14px] flex items-center gap-1 hover:bg-[#f0f3ff] p-1 rounded-lg">
                지금 확인하기
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className="px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-medium tracking-[0.02em]"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                긴급 1
              </span>
              <span
                className="px-3 py-1 rounded-full bg-[#ffdbcc] text-[#572000] text-[11px] font-medium tracking-[0.02em]"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                재작업 2
              </span>
              <span
                className="px-3 py-1 rounded-full bg-[#dae2f8] text-[#434654] text-[11px] font-medium tracking-[0.02em]"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                일반 5
              </span>
            </div>
          </div>

          {/* Card 2: 이번 주 진행률 */}
          <div className="bg-white rounded-xl border border-[#c3c6d6] p-5 flex flex-col gap-4 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-[18px] leading-6 font-semibold text-[#131c2b]">이번 주 진행률</span>
              <div
                className="px-2 py-0.5 bg-[#E6F4EA] text-[#137333] rounded-md text-[11px] font-medium tracking-[0.02em] flex items-center gap-1"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                <span
                  className="material-symbols-outlined text-[12px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  arrow_drop_up
                </span>
                12%p
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <span className="text-[32px] leading-[40px] font-bold tracking-[-0.03em] text-[#003d9b]">68%</span>
                <span className="text-[14px] text-[#434654]">47 / 69건 완료</span>
              </div>
              <div className="w-full h-3 bg-[#e8eeff] rounded-full overflow-hidden">
                <div className="h-full bg-[#0052cc] rounded-full" style={{ width: "68%" }} />
              </div>
            </div>
            <button className="w-full py-2 flex justify-center items-center gap-1 text-[14px] text-[#003d9b] border border-[#dae2ff] rounded-lg hover:bg-[#b2c5ff] transition-colors">
              자세히 보기
              <span className="material-symbols-outlined text-[16px]">keyboard_arrow_right</span>
            </button>
          </div>

          {/* Card 3: 팀 진행 현황 */}
          <div className="bg-white rounded-xl border border-[#c3c6d6] p-5 flex flex-col gap-4 shadow-sm">
            <div>
              <span className="text-[13px] font-medium text-[#475569]">팀 진행 현황</span>
            </div>
            <div>
              <span className="text-[16px] font-medium text-[#0E1726]">평균 진행 4.2건</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] text-[#475569]">가장 바쁨</span>
                <span className="text-[14px] font-medium text-[#DC2626]">정반장 (7건)</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] text-[#475569]">가장 여유</span>
                <span className="text-[14px] font-medium text-[#16A34A]">최신입 (2건)</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <section className="mt-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[18px] leading-6 font-semibold text-[#131c2b]">최근 활동</h2>
              <span className="material-symbols-outlined text-[#434654] cursor-pointer">more_horiz</span>
            </div>
            <div className="space-y-3">
              <ActivityItem
                icon="task_alt"
                iconColor="#0052cc"
                text={
                  <>
                    김작업님이 <span className="font-bold text-[#003d9b]">V-203</span> 작업 완료 신청
                  </>
                }
                time="10분 전"
              />
              <ActivityItem
                icon="task_alt"
                iconColor="#0052cc"
                text={
                  <>
                    이용접님이 <span className="font-bold text-[#003d9b]">DN50</span> 작업 완료 신청
                  </>
                }
                time="24분 전"
              />
              <ActivityItem
                icon="history_edu"
                iconColor="#fe6b00"
                text={
                  <>
                    도면 <span className="font-bold text-[#a04100]">P-103</span> 새 개정본이 업로드되었습니다
                  </>
                }
                time="1시간 전"
              />
            </div>
          </section>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white h-[64px] border-t border-[#E2E8F0] max-w-screen-sm mx-auto">
        <div className="flex w-full h-full">
          <NavTab
            label="홈"
            icon="home"
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />
          <NavTab
            label="팀원"
            icon="group"
            active={activeTab === "team"}
            onClick={() => setActiveTab("team")}
          />
          <NavTab
            label="도면"
            icon="description"
            active={activeTab === "drawings"}
            onClick={() => setActiveTab("drawings")}
          />
          <NavTab
            label="메시지"
            icon="chat_bubble"
            active={activeTab === "messages"}
            badge={3}
            onClick={() => { setActiveTab("messages"); router.push("/message_admin"); }}
          />
        </div>
      </nav>
    </div>
  );
}

function ActivityItem({
  icon,
  iconColor,
  text,
  time,
}: {
  icon: string;
  iconColor: string;
  text: React.ReactNode;
  time: string;
}) {
  return (
    <div className="flex items-start gap-4 p-3 bg-white rounded-xl border border-[#c3c6d6] shadow-sm">
      <div
        className="w-8 h-8 rounded-full bg-[#e0e8fe] flex items-center justify-center shrink-0"
        style={{ color: iconColor }}
      >
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      </div>
      <div className="flex flex-col">
        <p className="text-[14px] text-[#131c2b] leading-tight">{text}</p>
        <span className="text-[12px] text-[#434654] mt-1">{time}</span>
      </div>
    </div>
  );
}

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
