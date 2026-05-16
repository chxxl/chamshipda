"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type SubTab = "approved" | "reviewing";

export default function CompletePage() {
  const router = useRouter();
  const [subTab, setSubTab] = useState<SubTab>("approved");

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex flex-col">
      {/* 헤더 */}
      <header className="bg-white px-5 pt-5 pb-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            김
          </div>
          <h1 className="text-xl font-extrabold text-[#1A3BAE]">참ship다</h1>
        </div>
        <button className="p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pb-24">
        {/* 인사말 */}
        <section className="mt-5 mb-5">
          <p className="text-sm text-gray-500 mb-0.5">반가워요, 김철수 작업자님</p>
          <h2 className="text-xl font-extrabold text-gray-900">오늘의 작업 현황입니다</h2>
        </section>

        {/* 통계 카드 */}
        <section className="grid grid-cols-3 gap-2 mb-5">
          {[
            { label: "할 일", value: 5, color: "text-blue-600" },
            { label: "완료", value: 14, color: "text-red-500" },
            { label: "재작업", value: 1, color: "text-red-500" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl py-3 px-2 border border-gray-200 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500 font-medium">{label}</span>
              <span className={`text-2xl font-extrabold ${color}`}>{value}</span>
            </div>
          ))}
        </section>

        {/* 서브 탭 */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setSubTab("approved")}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
              subTab === "approved"
                ? "text-gray-900 border-b-2 border-orange-500"
                : "text-gray-400"
            }`}
          >
            ✅ 승인됨 (12)
          </button>
          <button
            onClick={() => setSubTab("reviewing")}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
              subTab === "reviewing"
                ? "text-gray-900 border-b-2 border-orange-500"
                : "text-gray-400"
            }`}
          >
            🕐 검토 중 (2)
          </button>
        </div>

        {/* 승인됨 목록 */}
        {subTab === "approved" && (
          <div className="flex flex-col gap-3">
            {/* 카드 1 */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">V-101 게이트밸브 설치</h3>
                <span className="flex items-center gap-1 text-green-600 text-xs font-semibold border border-green-500 rounded-full px-2.5 py-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  승인됨
                </span>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-3 py-3">
                <div className="w-14 h-14 rounded-xl bg-gray-400 flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-gray-700">"박반장: 깔끔하게 잘 됐습니다 👍"</p>
              </div>
            </div>

            {/* 카드 2 */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">메인 라인 압력 테스트</h3>
                <span className="flex items-center gap-1 text-green-600 text-xs font-semibold border border-green-500 rounded-full px-2.5 py-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  승인됨
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-sm text-gray-700">"박반장: 테스트 결과 양호"</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg">압력: 12.5 bar</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg">시간: 09:30</span>
              </div>
            </div>

            {/* 카드 3 */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">DN80 라인 도색</h3>
                <span className="flex items-center gap-1 text-green-600 text-xs font-semibold border border-green-500 rounded-full px-2.5 py-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  승인됨
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600" />
                </div>
                <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-500" />
                </div>
                <div className="w-24 h-20 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-2xl font-light flex-shrink-0">
                  +
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 검토 중 목록 */}
        {subTab === "reviewing" && (
          <div className="flex flex-col gap-3">
            {[
              { title: "DN50 배관 라인 연결", msg: "검토 중입니다. 잠시 기다려 주세요." },
              { title: "용접부 비파괴검사 (NDT) 준비", msg: "서류 확인 중입니다." },
            ].map(({ title, msg }) => (
              <div key={title} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-gray-900">{title}</h3>
                  <span className="text-yellow-600 text-xs font-semibold border border-yellow-400 rounded-full px-2.5 py-1">🕐 검토 중</span>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-sm text-gray-500">{msg}</p>
                </div>
              </div>
            ))}
          </div>
        )}
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

        <button className="flex-1 flex flex-col items-center justify-center py-3 gap-1">
          <div className="px-5 py-2 rounded-2xl bg-orange-500 flex flex-col items-center gap-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span className="text-xs font-semibold text-white">완료</span>
          </div>
        </button>

        <button className="flex-1 flex flex-col items-center justify-center py-3 gap-1">
          <div className="px-5 py-2 rounded-2xl flex flex-col items-center gap-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-xs font-semibold text-gray-400">메시지</span>
          </div>
        </button>
      </nav>
    </div>
  );
}
