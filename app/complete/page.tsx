"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { unreadCount, INITIAL_NOTIFICATIONS } from "@/lib/notifications";
import { getCurrentUser, type AuthUser } from "@/lib/auth";
import {
  formatRelativeTime,
  getApprovedTasksForUser,
  getReviewingTasksForUser,
  getWorkerStats,
  type CompletedItem,
  type ReviewingItem,
  type WorkerStats,
} from "@/lib/tasks";

type SubTab = "approved" | "reviewing";

export default function CompletePage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [subTab, setSubTab] = useState<SubTab>("approved");
  const [approved, setApproved] = useState<CompletedItem[]>([]);
  const [reviewing, setReviewing] = useState<ReviewingItem[]>([]);
  const [stats, setStats] = useState<WorkerStats>({ active: 0, approved: 0, rework: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      if (!u) {
        router.replace("/");
        return;
      }
      if (u.role !== "worker") {
        router.replace("/home_admin");
        return;
      }
      setUser(u);
      const [a, r, s] = await Promise.all([
        getApprovedTasksForUser(u.id),
        getReviewingTasksForUser(u.id),
        getWorkerStats(u.id),
      ]);
      setApproved(a);
      setReviewing(r);
      setStats(s);
      setLoading(false);
    })();
  }, [router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#EEF2FF] flex items-center justify-center">
        <p className="text-sm text-gray-500">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex flex-col">
      <header className="bg-white px-5 pt-5 pb-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            {user.initial}
          </div>
          <h1 className="text-xl font-extrabold text-[#1A3BAE]">참ship다</h1>
        </div>
        <button
          type="button"
          onClick={() => router.push("/notifications")}
          className="relative p-2"
          aria-label="알림"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount(INITIAL_NOTIFICATIONS) > 0 && (
            <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount(INITIAL_NOTIFICATIONS)}
            </span>
          )}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pb-24">
        <section className="mt-5 mb-5">
          <p className="text-sm text-gray-500 mb-0.5">반가워요, {user.name}님</p>
          <h2 className="text-xl font-extrabold text-gray-900">오늘의 작업 현황입니다</h2>
        </section>

        <section className="grid grid-cols-3 gap-2 mb-5">
          {[
            { label: "할 일", value: stats.active, color: "text-blue-600" },
            { label: "완료", value: stats.approved, color: "text-green-600" },
            { label: "재작업", value: stats.rework, color: "text-red-500" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl py-3 px-2 border border-gray-200 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500 font-medium">{label}</span>
              <span className={`text-2xl font-extrabold ${color}`}>{value}</span>
            </div>
          ))}
        </section>

        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setSubTab("approved")}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
              subTab === "approved"
                ? "text-gray-900 border-b-2 border-orange-500"
                : "text-gray-400"
            }`}
          >
            ✅ 승인됨 ({approved.length})
          </button>
          <button
            onClick={() => setSubTab("reviewing")}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
              subTab === "reviewing"
                ? "text-gray-900 border-b-2 border-orange-500"
                : "text-gray-400"
            }`}
          >
            🕐 검토 중 ({reviewing.length})
          </button>
        </div>

        {subTab === "approved" && (
          <div className="flex flex-col gap-3">
            {approved.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-sm text-gray-500 border border-gray-100">
                승인된 작업이 없습니다
              </div>
            ) : (
              approved.map((item) => (
                <div key={item.taskId} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                    <span className="flex items-center gap-1 text-green-600 text-xs font-semibold border border-green-500 rounded-full px-2.5 py-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      승인됨
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
                    <p className="text-sm text-gray-700">
                      {item.reviewerName ? `${item.reviewerName}님이 승인했습니다` : "승인되었습니다"}
                    </p>
                    {item.approvedAt && (
                      <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                        {formatRelativeTime(item.approvedAt)}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {subTab === "reviewing" && (
          <div className="flex flex-col gap-3">
            {reviewing.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-sm text-gray-500 border border-gray-100">
                검토 중인 작업이 없습니다
              </div>
            ) : (
              reviewing.map((item) => (
                <div key={item.taskId} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                    <span className="text-yellow-600 text-xs font-semibold border border-yellow-400 rounded-full px-2.5 py-1">
                      🕐 검토 중
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
                    <p className="text-sm text-gray-500">관리자 검토 중입니다.</p>
                    <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                      {formatRelativeTime(item.submittedAt)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

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

        <button
          onClick={() => router.push("/message")}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
        >
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
