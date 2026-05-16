"use client";

import { useRouter } from "next/navigation";

export default function WaitPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex flex-col">
      {/* 헤더 */}
      <header className="bg-[#EEF2FF] px-4 pt-5 pb-3 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-gray-700 hover:text-gray-900 transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-lg font-extrabold text-gray-900">용접부 비파괴검사 (NDT) 준비</h1>
      </header>

      {/* 상태 바 */}
      <div className="bg-[#EEF2FF] px-4 pb-3 flex items-center gap-2 overflow-x-auto">
        <span className="bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0">대기</span>
        <span className="border border-gray-300 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg flex-shrink-0 bg-white">P-102 Rev.B</span>
        <div className="flex items-center gap-1 flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-xs text-gray-600">구역 B-1</span>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-10">
        {/* 도면 뷰어 */}
        <div className="relative bg-[#1E2A3A] w-full" style={{ height: "300px" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border border-dashed border-gray-500 w-4/5 h-4/5 relative flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" fill="none">
                <line x1="30" y1="100" x2="270" y2="100" stroke="#9CA3AF" strokeWidth="2" />
                <line x1="80" y1="100" x2="80" y2="50" stroke="#9CA3AF" strokeWidth="2" />
                <circle cx="80" cy="50" r="12" stroke="#9CA3AF" strokeWidth="2" fill="none" />
                <line x1="150" y1="100" x2="150" y2="140" stroke="#9CA3AF" strokeWidth="2" />
                <rect x="135" y="140" width="30" height="20" stroke="#9CA3AF" strokeWidth="2" fill="none" />
                <line x1="220" y1="100" x2="220" y2="60" stroke="#9CA3AF" strokeWidth="2" />
                <circle cx="220" cy="60" r="12" stroke="#9CA3AF" strokeWidth="2" fill="none" />
              </svg>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <span className="bg-gray-500 text-white text-xs font-semibold px-3 py-1 rounded-full">도면 미리보기</span>
              </div>
            </div>
          </div>

          {/* 줌 컨트롤 */}
          <div className="absolute right-3 top-4 flex flex-col gap-2">
            {["+", "−", "↺"].map((icon) => (
              <button key={icon} className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center text-gray-700 font-bold text-lg hover:bg-gray-50 transition-colors">
                {icon}
              </button>
            ))}
          </div>

          <div className="absolute bottom-3 left-3">
            <span className="text-gray-400 text-xs">ISO VIEW - SHIP_C_007</span>
          </div>
        </div>

        <div className="px-4 pt-4 flex flex-col gap-3">
          {/* 대기 안내 카드 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-11 h-11 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-0.5">작업 상태</p>
              <p className="text-base font-extrabold text-gray-900">선행 작업 완료 대기 중</p>
            </div>
          </div>

          {/* 작업 정보 카드 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3BAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="font-bold text-gray-900">작업 정보</span>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span className="text-gray-500">검사 방법</span>
                <span className="font-semibold text-gray-900">초음파 탐상 (UT)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">검사 대상</span>
                <span className="font-semibold text-gray-900">용접부 전체</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">예상 작업 시간</span>
                <span className="font-semibold text-blue-600">90 min</span>
              </div>
            </div>
          </div>

          {/* 주의사항 카드 */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-orange-500 mb-0.5">주의사항</p>
              <p className="text-base font-extrabold text-gray-900">NDT 자격증 보유자만 진행</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
