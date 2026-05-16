"use client";

import { useRouter } from "next/navigation";

const DRAWINGS = [
  { id: "1", title: "메인 배관 설치도", date: "5월 10일 수정", tasks: 5 },
  { id: "2", title: "부속 배관 설치도", date: "5월 5일 수정", tasks: 3 },
  { id: "3", title: "냉각수 배관도", date: "4월 20일 수정", tasks: 2 },
  { id: "4", title: "가스 라인 배관도", date: "4월 15일 수정", tasks: 1 },
  { id: "5", title: "냉각 펌프 배관도", date: "4월 28일 등록", tasks: 4 },
  { id: "6", title: "윤활유 배관도", date: "3월 28일 등록", tasks: 0 },
];

function BlueprintThumbnail() {
  return (
    <div className="w-[88px] h-[68px] rounded-lg bg-[#0d1f3c] flex-shrink-0 overflow-hidden flex items-center justify-center">
      <svg viewBox="0 0 88 68" width="88" height="68" fill="none">
        <rect width="88" height="68" fill="#0d1f3c" />
        <line x1="8" y1="20" x2="80" y2="20" stroke="#4a7fc1" strokeWidth="0.8" />
        <line x1="8" y1="34" x2="80" y2="34" stroke="#4a7fc1" strokeWidth="0.8" />
        <line x1="8" y1="48" x2="80" y2="48" stroke="#4a7fc1" strokeWidth="0.8" />
        <line x1="20" y1="8" x2="20" y2="60" stroke="#4a7fc1" strokeWidth="0.8" />
        <line x1="44" y1="8" x2="44" y2="60" stroke="#4a7fc1" strokeWidth="0.8" />
        <line x1="68" y1="8" x2="68" y2="60" stroke="#4a7fc1" strokeWidth="0.8" />
        <line x1="8" y1="20" x2="44" y2="20" stroke="#7eb8f7" strokeWidth="1.5" />
        <line x1="44" y1="20" x2="44" y2="48" stroke="#7eb8f7" strokeWidth="1.5" />
        <line x1="44" y1="48" x2="68" y2="48" stroke="#7eb8f7" strokeWidth="1.5" />
        <rect x="18" y="18" width="5" height="5" stroke="#7eb8f7" strokeWidth="1" fill="none" />
        <rect x="42" y="30" width="5" height="5" stroke="#7eb8f7" strokeWidth="1" fill="none" />
        <circle cx="44" cy="34" r="3" stroke="#a0c8ff" strokeWidth="1" fill="none" />
        <line x1="8" y1="8" x2="80" y2="8" stroke="#2a4a7f" strokeWidth="0.5" />
        <line x1="8" y1="60" x2="80" y2="60" stroke="#2a4a7f" strokeWidth="0.5" />
        <line x1="8" y1="8" x2="8" y2="60" stroke="#2a4a7f" strokeWidth="0.5" />
        <line x1="80" y1="8" x2="80" y2="60" stroke="#2a4a7f" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export default function DrawingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col">
      {/* 헤더 */}
      <header className="bg-[#f9f9ff] px-5 pt-6 pb-4 flex items-start justify-between border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">도면 관리</h1>
          <p className="text-sm text-gray-400 mt-0.5">배관 1팀 · 8장</p>
        </div>
        <button className="flex items-center gap-1.5 text-[#0052cc] font-semibold text-sm mt-1">
          <span className="text-lg font-light">+</span>
          새 도면
        </button>
      </header>

      {/* 도면 목록 */}
      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 flex flex-col gap-3">
        {DRAWINGS.map((drawing) => (
          <button
            key={drawing.id}
            className="bg-white rounded-2xl px-4 py-4 border border-gray-200 flex items-center gap-4 text-left w-full hover:bg-gray-50 transition-colors shadow-sm"
          >
            <BlueprintThumbnail />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900">{drawing.title}</h3>
              <p className="text-sm text-gray-400 mt-0.5">{drawing.date}</p>
              <p className={`text-sm mt-0.5 ${drawing.tasks > 0 ? "text-gray-500" : "text-gray-300"}`}>
                {drawing.tasks > 0 ? `연결 작업 ${drawing.tasks}건` : "연결 작업 없음"}
              </p>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0C4D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </main>

      {/* 하단 내비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white h-[64px] border-t border-gray-200 max-w-screen-sm mx-auto">
        <div className="flex w-full h-full">
          <button
            onClick={() => router.push("/home_admin")}
            className="flex-1 flex flex-col items-center justify-center text-[#94A3B8] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">home</span>
            <span className="text-[12px] font-medium mt-0.5">홈</span>
          </button>
          <button
            onClick={() => router.push("/home_admin")}
            className="flex-1 flex flex-col items-center justify-center text-[#94A3B8] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">group</span>
            <span className="text-[12px] font-medium mt-0.5">팀원</span>
          </button>
          <button className="flex-1 flex flex-col items-center justify-center text-[#0052cc]">
            <div className="px-4 py-1.5 rounded-2xl bg-[#e8eeff] flex flex-col items-center">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
              <span className="text-[12px] font-medium mt-0.5">도면</span>
            </div>
          </button>
          <button
            onClick={() => router.push("/message_admin")}
            className="flex-1 flex flex-col items-center justify-center text-[#94A3B8] transition-colors"
          >
            <div className="relative inline-flex flex-col items-center">
              <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">3</span>
            </div>
            <span className="text-[12px] font-medium mt-0.5">메시지</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
