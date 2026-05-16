"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type TabType = "admin" | "team";

const ADMIN_MESSAGES = [
  {
    id: "1",
    name: "박반장",
    role: "현장관리자",
    time: "오전 10:43",
    unread: true,
    hasPhoto: true,
    photoColor: "from-blue-500 to-blue-700",
    initial: "박",
    body: "V-203 재작업 부탁드립니다. 도면 기준과 실제 설치 각도가 상이합니다.",
    linkedTask: "V-203 게이트밸브 재설치",
    hasReply: true,
  },
  {
    id: "2",
    name: "이품질",
    role: "품질관리자",
    time: "오전 09:12",
    unread: true,
    hasPhoto: true,
    photoColor: "from-orange-400 to-orange-600",
    initial: "이",
    body: "오늘 검수 시간 변경 안내 드립니다. 오후 2시에서 4시로 변경되었습니다.",
    hasReply: true,
  },
  {
    id: "3",
    name: "김안전",
    role: "안전팀",
    time: "어제",
    unread: false,
    hasPhoto: false,
    initial: "김",
    body: "금일 작업 전 TBM 사진 업로드 누락되었습니다. 확인 바랍니다.",
    hasReply: false,
  },
];

const TEAM_MESSAGES = [
  {
    id: "1",
    name: "최용접",
    role: "용접팀",
    time: "오전 11:20",
    unread: true,
    hasPhoto: true,
    photoColor: "from-green-400 to-green-600",
    initial: "최",
    body: "오늘 용접 작업 구역 변경됐나요? 확인 부탁드립니다.",
    hasReply: false,
  },
  {
    id: "2",
    name: "정배관",
    role: "배관팀",
    time: "오전 09:55",
    unread: false,
    hasPhoto: true,
    photoColor: "from-purple-400 to-purple-600",
    initial: "정",
    body: "DN50 자재 입고 완료됐습니다. 창고에서 수령해주세요.",
    hasReply: true,
  },
];

export default function MessagePage() {
  const router = useRouter();
  const [tab, setTab] = useState<TabType>("admin");

  const messages = tab === "admin" ? ADMIN_MESSAGES : TEAM_MESSAGES;

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex flex-col">
      {/* 헤더 */}
      <header className="bg-white px-5 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
        <h1 className="text-2xl font-extrabold text-gray-900">메시지</h1>
        <div className="flex items-center gap-3">
          <button className="p-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button className="w-10 h-10 bg-[#1A3BAE] rounded-xl flex items-center justify-center">
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
          onClick={() => setTab("admin")}
          className={`flex-1 py-3.5 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
            tab === "admin" ? "text-[#1A3BAE] border-b-2 border-[#1A3BAE]" : "text-gray-400"
          }`}
        >
          <span>📣</span>
          관리자
          <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${tab === "admin" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-500"}`}>
            2
          </span>
        </button>
        <button
          onClick={() => setTab("team")}
          className={`flex-1 py-3.5 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
            tab === "team" ? "text-[#1A3BAE] border-b-2 border-[#1A3BAE]" : "text-gray-400"
          }`}
        >
          <span>👥</span>
          팀원
          <span className="text-gray-400 font-normal">(5)</span>
        </button>
      </div>

      {/* 메시지 목록 */}
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm flex flex-col gap-3"
          >
            {/* 상단: 아바타 + 이름 + 시간 */}
            <div className="flex items-start gap-3">
              {/* 아바타 */}
              <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden ${msg.hasPhoto ? `bg-gradient-to-br ${msg.photoColor}` : "bg-gray-200"}`}>
                {msg.hasPhoto ? (
                  <span className="text-white font-bold text-base">{msg.initial}</span>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>

              {/* 이름 + 역할 + 시간 */}
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

                {/* 본문 */}
                <p className="mt-1.5 text-sm text-gray-700 leading-relaxed">{msg.body}</p>
              </div>
            </div>

            {/* 연결된 작업 */}
            {msg.linkedTask && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span className="text-sm font-semibold text-[#1A3BAE]">{msg.linkedTask}</span>
              </div>
            )}

            {/* 답장 표시 */}
            {msg.hasReply && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-[#1A3BAE] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>

      {/* 하단 내비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex max-w-sm mx-auto w-full">
        <button
          onClick={() => router.push("/home")}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
        >
          <div className="px-5 py-2 rounded-2xl flex flex-col items-center gap-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="13" y="3" width="8" height="4" rx="1" />
              <rect x="13" y="10" width="8" height="4" rx="1" />
              <rect x="3" y="13" width="7" height="7" rx="1" />
            </svg>
            <span className="text-xs font-semibold text-gray-400">할 일</span>
          </div>
        </button>

        <button
          onClick={() => router.push("/complete")}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
        >
          <div className="px-5 py-2 rounded-2xl flex flex-col items-center gap-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span className="text-xs font-semibold text-gray-400">완료</span>
          </div>
        </button>

        <button className="flex-1 flex flex-col items-center justify-center py-3 gap-1">
          <div className="px-5 py-2 rounded-2xl bg-orange-500 flex flex-col items-center gap-1 relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-xs font-semibold text-white">메시지</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
          </div>
        </button>
      </nav>
    </div>
  );
}
