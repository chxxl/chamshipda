"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CustomDrawing {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
}

export default function WorkPage() {
  const router = useRouter();
  const [checklist, setChecklist] = useState({ item1: false, item2: false });
  const [uploadedDrawings, setUploadedDrawings] = useState<CustomDrawing[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("custom_drawings");
    if (saved) setUploadedDrawings(JSON.parse(saved));
  }, []);

  const toggleItem = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex flex-col">
      {/* 헤더 */}
      <header className="bg-[#EEF2FF] px-4 pt-5 pb-3 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-gray-700 hover:text-gray-900 transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-lg font-extrabold text-gray-900">DN50 배관 라인 연결</h1>
      </header>

      {/* 상태 바 */}
      <div className="bg-[#EEF2FF] px-4 pb-3 flex items-center gap-2 overflow-x-auto">
        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0">진행 중</span>
        <span className="border border-gray-300 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg flex-shrink-0 bg-white">P-101 Rev.D</span>
        <div className="flex items-center gap-1 flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-xs text-gray-600">구역 A-3</span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-xs font-bold text-red-500">32분 남음</span>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-28">
        {/* 도면 뷰어 */}
        <div className="relative bg-[#1E2A3A] w-full" style={{ height: "300px" }}>
          {uploadedDrawings.length > 0 ? (
            /* 업로드된 도면 이미지 표시 */
            <>
              <img
                src={uploadedDrawings[0].imageUrl}
                alt={uploadedDrawings[0].title}
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div className="absolute bottom-3 left-3 bg-black/50 rounded-lg px-3 py-1">
                <span className="text-white text-xs font-semibold">{uploadedDrawings[0].title}</span>
              </div>
              {uploadedDrawings.length > 1 && (
                <div className="absolute bottom-3 right-3 flex gap-1">
                  {uploadedDrawings.slice(0, 3).map((d, i) => (
                    <div key={d.id} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-white" : "bg-white/40"}`} />
                  ))}
                </div>
              )}
            </>
          ) : (
            /* 기본 SVG 도면 */
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border border-dashed border-gray-500 w-4/5 h-4/5 relative flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" fill="none">
                  <line x1="40" y1="80" x2="160" y2="80" stroke="#9CA3AF" strokeWidth="2" />
                  <line x1="160" y1="80" x2="160" y2="40" stroke="#9CA3AF" strokeWidth="2" />
                  <rect x="150" y="32" width="20" height="16" stroke="#9CA3AF" strokeWidth="2" fill="none" />
                  <line x1="160" y1="80" x2="260" y2="80" stroke="#9CA3AF" strokeWidth="2" />
                  <line x1="220" y1="80" x2="220" y2="140" stroke="#9CA3AF" strokeWidth="2" />
                  <line x1="180" y1="140" x2="260" y2="140" stroke="#9CA3AF" strokeWidth="2" />
                </svg>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="8" y2="18" />
                      <line x1="12" y1="6" x2="12" y2="18" />
                      <line x1="16" y1="6" x2="16" y2="18" />
                      <line x1="5" y1="9" x2="19" y2="9" />
                      <line x1="5" y1="15" x2="19" y2="15" />
                    </svg>
                  </div>
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">탭해서 설명 보기</span>
                </div>
              </div>
            </div>
          )}

          {/* 줌 컨트롤 */}
          <div className="absolute right-3 top-4 flex flex-col gap-2">
            {["+", "−", "↺"].map((icon) => (
              <button key={icon} className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center text-gray-700 font-bold text-lg hover:bg-gray-50 transition-colors">
                {icon}
              </button>
            ))}
          </div>

          {/* ISO VIEW 라벨 */}
          <div className="absolute bottom-3 left-3">
            <span className="text-gray-400 text-xs">ISO VIEW - SHIP_B_004</span>
          </div>
        </div>

        <div className="px-4 pt-4 flex flex-col gap-3">
          {/* 준비물 카드 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3BAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              </svg>
              <span className="font-bold text-gray-900">준비물</span>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { key: "item1" as const, label: "DN50 SCH40 강관 6m × 2" },
                { key: "item2" as const, label: "플랜지 및 볼트 세트 (12개입)" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => toggleItem(key)}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700 text-left hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${checklist[key] ? "bg-blue-600 border-blue-600" : "border-blue-400 bg-white"}`}>
                    {checklist[key] && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  {label}
                </button>
              ))}
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
              <p className="text-base font-extrabold text-gray-900">화기작업 허가 필요</p>
            </div>
          </div>

          {/* 예상 작업 시간 카드 */}
          <div className="bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-sm text-gray-600">예상 작업 시간</span>
            </div>
            <span className="text-base font-extrabold text-blue-600">45 min</span>
          </div>
        </div>
      </main>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto w-full bg-[#EEF2FF] px-4 py-4 flex gap-3">
        <button
          onClick={() => { localStorage.setItem("task_1_status", "inprogress"); router.push("/home"); }}
          className="flex-none border border-gray-300 bg-white text-gray-700 font-semibold text-sm px-5 py-4 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          임시 저장
        </button>
        <button
          onClick={() => router.push("/complete")}
          className="flex-1 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          작업 완료 신청
        </button>
      </div>
    </div>
  );
}
