"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getConversationsByTab,
  unreadCountByTab,
  type ConversationTab,
  type ConversationThread,
} from "@/lib/conversations";

function MessageListItem({
  thread,
  onOpen,
}: {
  thread: ConversationThread;
  onOpen: () => void;
}) {
  const hasReply = thread.messages.some((m) => m.sender === "me");

  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full text-left bg-white rounded-2xl p-4 border border-blue-100 shadow-sm flex flex-col gap-3 active:bg-gray-50 transition-colors"
    >
      <MessageRow thread={thread} />
      {thread.linkedTask && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span className="text-sm font-semibold text-[#1A3BAE]">
            {thread.linkedTask}
          </span>
        </div>
      )}
      {hasReply && (
        <ReplyIndicator />
      )}
      <span className="text-xs font-semibold text-[#1A3BAE]">대화 보기 →</span>
    </button>
  );
}

function MessageRow({ thread }: { thread: ConversationThread }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden ${
          thread.hasPhoto
            ? `bg-gradient-to-br ${thread.photoColor}`
            : "bg-gray-200"
        }`}
      >
        {thread.hasPhoto ? (
          <span className="text-white font-bold text-base">{thread.initial}</span>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-sm">{thread.name}</span>
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-md">
              {thread.role}
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs text-gray-400">{thread.time}</span>
            {thread.unread && (
              <span className="w-2 h-2 rounded-full bg-red-500" aria-label="읽지 않음" />
            )}
          </div>
        </div>
        <p className="mt-1.5 text-sm text-gray-700 leading-relaxed line-clamp-2">
          {thread.preview}
        </p>
      </div>
    </div>
  );
}

function ReplyIndicator() {
  return (
    <div className="flex justify-start">
      <div className="w-7 h-7 rounded-full bg-[#1A3BAE] flex items-center justify-center">
        <span className="text-white text-xs font-bold">M</span>
      </div>
    </div>
  );
}

export default function MessagePage() {
  const router = useRouter();
  const [tab, setTab] = useState<ConversationTab>("admin");

  const messages = getConversationsByTab(tab);
  const adminUnread = unreadCountByTab("admin");
  const teamUnread = unreadCountByTab("team");
  const teamCount = getConversationsByTab("team").length;
  const totalUnread = adminUnread + teamUnread;

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex flex-col">
      <header className="bg-white px-5 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
        <h1 className="text-2xl font-extrabold text-gray-900">메시지</h1>
        <div className="flex items-center gap-3">
          <button type="button" className="p-1" aria-label="검색">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#374151"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button
            type="button"
            className="w-10 h-10 bg-[#1A3BAE] rounded-xl flex items-center justify-center"
            aria-label="새 메시지"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="bg-white flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setTab("admin")}
          className={`flex-1 py-3.5 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
            tab === "admin"
              ? "text-[#1A3BAE] border-b-2 border-[#1A3BAE]"
              : "text-gray-400"
          }`}
        >
          <span>📣</span>
          관리자
          {adminUnread > 0 && (
            <span
              className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                tab === "admin" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {adminUnread}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setTab("team")}
          className={`flex-1 py-3.5 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
            tab === "team"
              ? "text-[#1A3BAE] border-b-2 border-[#1A3BAE]"
              : "text-gray-400"
          }`}
        >
          <span>👥</span>
          팀원
          <span className="text-gray-400 font-normal">({teamCount})</span>
        </button>
      </div>

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-24 flex flex-col gap-3">
        {messages.map((thread) => (
          <MessageListItem
            key={thread.threadId}
            thread={thread}
            onOpen={() => router.push(`/message/${thread.threadId}`)}
          />
        ))}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex max-w-sm mx-auto w-full">
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
        >
          <NavItem label="할 일" active={false} icon="todo" />
        </button>
        <button
          type="button"
          onClick={() => router.push("/complete")}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
        >
          <NavItem label="완료" active={false} icon="done" />
        </button>
        <button
          type="button"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
        >
          <NavItem
            label="메시지"
            active
            icon="message"
            badge={totalUnread > 0 ? totalUnread : undefined}
          />
        </button>
      </nav>
    </div>
  );
}

function NavItem({
  label,
  active,
  icon,
  badge,
}: {
  label: string;
  active: boolean;
  icon: "todo" | "done" | "message";
  badge?: number;
}) {
  const stroke = active ? "white" : "#9CA3AF";
  return (
    <div
      className={`px-5 py-2 rounded-2xl flex flex-col items-center gap-1 relative ${
        active ? "bg-orange-500" : ""
      }`}
    >
      {icon === "todo" && (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="13" y="3" width="8" height="4" rx="1" />
          <rect x="13" y="10" width="8" height="4" rx="1" />
          <rect x="3" y="13" width="7" height="7" rx="1" />
        </svg>
      )}
      {icon === "done" && (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      )}
      {icon === "message" && (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )}
      <span
        className={`text-xs font-semibold ${active ? "text-white" : "text-gray-400"}`}
      >
        {label}
      </span>
      {badge !== undefined && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
  );
}
