"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type TabType = "worker" | "team";

const WORKER_MESSAGES = [
  {
    id: "1",
    name: "김작업",
    role: "배관 작업자",
    time: "오전 10:43",
    unread: true,
    photoColor: "from-blue-400 to-blue-600",
    initial: "김",
    body: "V-203 게이트밸브 재설치 완료했습니다. 확인 부탁드립니다.",
    linkedTask: "V-203 게이트밸브 재설치",
    hasReply: true,
  },
  {
    id: "2",
    name: "이용접",
    role: "용접 작업자",
    time: "오전 09:30",
    unread: true,
    photoColor: "from-orange-400 to-orange-600",
    initial: "이",
    body: "DN50 배관 라인 연결 작업 중입니다. 자재 추가 요청드립니다.",
    hasReply: false,
  },
  {
    id: "3",
    name: "박도장",
    role: "도장 작업자",
    time: "어제",
    unread: false,
    photoColor: "from-green-400 to-green-600",
    initial: "박",
    body: "DN80 라인 도색 작업 완료했습니다. 사진 첨부했습니다.",
    hasReply: true,
  },
];

const TEAM_MESSAGES = [
  {
    id: "1",
    name: "최품질",
    role: "품질관리자",
    time: "오전 11:00",
    unread: true,
    photoColor: "from-purple-400 to-purple-600",
    initial: "최",
    body: "오늘 오후 2시 품질 검수 일정 확인 부탁드립니다.",
    hasReply: false,
  },
  {
    id: "2",
    name: "정안전",
    role: "안전팀",
    time: "오전 08:50",
    unread: false,
    photoColor: "from-red-400 to-red-600",
    initial: "정",
    body: "금일 TBM 완료됐습니다. 작업자 전원 안전교육 이수 확인 바랍니다.",
    hasReply: true,
  },
];

export default function MessageAdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<TabType>("worker");

  const messages = tab === "worker" ? WORKER_MESSAGES : TEAM_MESSAGES;

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col">
      {/* 헤더 */}
      <header className="bg-white px-5 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
        <h1 className="text-2xl font-extrabold text-gray-900">메시지</h1>
        <div className="flex items-center gap-3">
          <button className="p-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button className="w-10 h-10 bg-[#0052cc] rounded-xl flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </header>

      {/* 탭 */}
      <div className="bg-white flex border-b border-gray-200">
        <button
          onClick={() => setTab("worker")}
          className={`flex-1 py-3.5 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
            tab === "worker" ? "text-[#0052cc] border-b-2 border-[#0052cc]" : "text-gray-400"
          }`}
        >
          <span>🔧</span>
          작업자
          <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${tab === "worker" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-500"}`}>
            2
          </span>
        </button>
        <button
          onClick={() => setTab("team")}
          className={`flex-1 py-3.5 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
            tab === "team" ? "text-[#0052cc] border-b-2 border-[#0052cc]" : "text-gray-400"
          }`}
        >
          <span>👥</span>
          팀원
          <span className="text-gray-400 font-normal">(4)</span>
        </button>
      </div>

      {/* 메시지 목록 */}
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 flex flex-col gap-3">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${msg.photoColor}`}>
                <span className="text-white font-bold text-base">{msg.initial}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{msg.name}</span>
                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-md">{msg.role}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-xs text-gray-400">{msg.time}</span>
                    {msg.unread && <div className="w-2 h-2 rounded-full bg-red-500" />}
                  </div>
                </div>
                <p className="mt-1.5 text-sm text-gray-700 leading-relaxed">{msg.body}</p>
              </div>
            </div>

            {msg.linkedTask && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span className="text-sm font-semibold text-[#0052cc]">{msg.linkedTask}</span>
              </div>
            )}

            {msg.hasReply && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-[#0052cc] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>

      {/* 하단 내비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white h-[64px] border-t border-gray-200 max-w-screen-sm mx-auto">
        <div className="flex w-full h-full">
          {[
            { label: "홈", icon: "home", tab: "home" },
            { label: "팀원", icon: "group", tab: "team" },
            { label: "도면", icon: "description", tab: "drawings" },
          ].map(({ label, icon, tab: t }) => (
            <button
              key={t}
              onClick={() => router.push("/home_admin")}
              className="flex-1 flex flex-col items-center justify-center text-[#94A3B8] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">{icon}</span>
              <span className="text-[12px] font-medium mt-0.5">{label}</span>
            </button>
          ))}
          <button className="flex-1 flex flex-col items-center justify-center text-[#0052cc] transition-colors">
            <div className="relative inline-flex flex-col items-center">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">3</span>
            </div>
            <span className="text-[12px] font-medium mt-0.5">메시지</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
