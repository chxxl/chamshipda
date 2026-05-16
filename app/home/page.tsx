"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type TabType = "todo" | "done" | "message";

interface Task {
  id: string;
  status: "rework" | "inprogress" | "waiting";
  title: string;
  feedback?: string;
  feedbackAuthor?: string;
  progress?: number;
}

const TASKS: Task[] = [
  {
    id: "1",
    status: "rework",
    title: "V-203 게이트밸브 재설치",
    feedbackAuthor: "박반장",
    feedback: "가스켓 방향이 반대입니다. 재확인 후 다시 체결하세요.",
  },
  {
    id: "2",
    status: "inprogress",
    title: "DN50 배관 라인 연결",
    progress: 60,
  },
  {
    id: "3",
    status: "waiting",
    title: "용접부 비파괴검사 (NDT) 준비",
  },
];

const STATUS_CONFIG = {
  rework: { label: "재작업 필요", bg: "bg-red-500", text: "text-white" },
  inprogress: { label: "진행 중", bg: "bg-blue-500", text: "text-white" },
  waiting: { label: "대기", bg: "bg-gray-200", text: "text-gray-600" },
};

function TaskCard({ task }: { task: Task }) {
  const router = useRouter();
  const config = STATUS_CONFIG[task.status];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
      {/* 상태 배지 + 경고 아이콘 */}
      <div className="flex items-center justify-between">
        <span className={`${config.bg} ${config.text} text-xs font-semibold px-3 py-1 rounded-full`}>
          {config.label}
        </span>
        {task.status === "rework" && (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        )}
      </div>

      {/* 제목 */}
      <h3 className="text-base font-bold text-gray-900">{task.title}</h3>

      {/* 피드백 (재작업) */}
      {task.feedback && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold text-gray-900">{task.feedbackAuthor}:</span>{" "}
          {task.feedback}
        </div>
      )}

      {/* 진행률 (진행 중) */}
      {task.progress !== undefined && (
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">작업 공정률</span>
            <span className="font-semibold text-blue-600">{task.progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* 액션 버튼 */}
      {task.status === "rework" && (
        <button onClick={() => router.push("/work")} className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          작업 시작
        </button>
      )}
      {task.status === "inprogress" && (
        <button className="w-full border-2 border-blue-600 text-blue-600 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="4" height="18" rx="1" />
            <polygon points="11,3 24,12 11,21" />
          </svg>
          이어서 작업
        </button>
      )}
      {task.status === "waiting" && (
        <button className="w-full border border-gray-300 text-gray-700 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          도면 보기
        </button>
      )}
    </div>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>("todo");

  const today = new Date();
  const dateStr = `${today.getMonth() + 1}월 ${today.getDate()}일 ${["일", "월", "화", "수", "목", "금", "토"][today.getDay()]}요일`;

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex flex-col">
      {/* 헤더 */}
      <header className="bg-[#EEF2FF] px-5 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              김
            </div>
          </div>
          <div>
            <h1 className="text-base font-extrabold text-[#1A3BAE] leading-tight">참ship다</h1>
            <p className="text-xs text-gray-500">{dateStr}</p>
          </div>
        </div>
        <button className="relative p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>
      </header>

      {/* 스크롤 영역 */}
      <main className="flex-1 overflow-y-auto px-5 pb-24">
        {/* 인사말 */}
        <section className="mt-4 mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 leading-snug">
            안녕하세요,<br />김작업님
          </h2>
          <p className="mt-1 text-sm text-gray-500">협력업체 배관 작업자</p>
        </section>

        {/* 통계 카드 3개 */}
        <section className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-medium">오늘 할 일</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-blue-600">5</span>
              <span className="text-xs text-gray-400">건</span>
            </div>
          </div>
          <div className="bg-green-50 rounded-2xl p-3 shadow-sm border border-green-100 flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-medium">완료</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-green-600">12</span>
              <span className="text-xs text-gray-400">건</span>
            </div>
          </div>
          <div className="bg-red-50 rounded-2xl p-3 shadow-sm border border-red-100 flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-medium">재작업</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-red-500">1</span>
              <span className="text-xs text-gray-400">건</span>
            </div>
          </div>
        </section>

        {/* 작업 리스트 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-gray-900">작업 리스트</h3>
            <span className="text-xs text-gray-400">최근 업데이트: 08:42</span>
          </div>
          <div className="flex flex-col gap-3">
            {TASKS.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </section>
      </main>

      {/* 하단 내비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex max-w-sm mx-auto w-full">
        <button
          onClick={() => setActiveTab("todo")}
          className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
            activeTab === "todo" ? "" : ""
          }`}
        >
          <div className={`px-5 py-2 rounded-2xl flex flex-col items-center gap-1 transition-colors ${
            activeTab === "todo" ? "bg-orange-500" : ""
          }`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={activeTab === "todo" ? "white" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="13" y="3" width="8" height="4" rx="1" />
              <rect x="13" y="10" width="8" height="4" rx="1" />
              <rect x="3" y="13" width="7" height="7" rx="1" />
            </svg>
            <span className={`text-xs font-semibold ${activeTab === "todo" ? "text-white" : "text-gray-400"}`}>
              할 일
            </span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab("done")}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
        >
          <div className={`px-5 py-2 rounded-2xl flex flex-col items-center gap-1 transition-colors ${
            activeTab === "done" ? "bg-orange-500" : ""
          }`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={activeTab === "done" ? "white" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span className={`text-xs font-semibold ${activeTab === "done" ? "text-white" : "text-gray-400"}`}>
              완료
            </span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab("message")}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
        >
          <div className={`px-5 py-2 rounded-2xl flex flex-col items-center gap-1 transition-colors ${
            activeTab === "message" ? "bg-orange-500" : ""
          }`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={activeTab === "message" ? "white" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className={`text-xs font-semibold ${activeTab === "message" ? "text-white" : "text-gray-400"}`}>
              메시지
            </span>
          </div>
        </button>
      </nav>
    </div>
  );
}
