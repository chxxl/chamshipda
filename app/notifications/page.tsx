"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppNotification,
  INITIAL_NOTIFICATIONS,
  NOTIFICATION_TYPE_CONFIG,
  NotificationType,
  unreadCount,
  getNotificationHref,
} from "@/lib/notifications";

type FilterType = "all" | NotificationType;

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "new", label: "신규" },
  { key: "rework", label: "재작업" },
  { key: "update", label: "변경" },
];

function NotificationCard({
  notification,
  onOpen,
}: {
  notification: AppNotification;
  onOpen: (n: AppNotification) => void;
}) {
  const config = NOTIFICATION_TYPE_CONFIG[notification.type];

  return (
    <button
      type="button"
      onClick={() => onOpen(notification)}
      className={`w-full text-left bg-white rounded-2xl p-4 shadow-sm border flex flex-col gap-3 transition-colors active:bg-gray-50 ${
        notification.read ? "border-gray-100" : "border-blue-200 ring-1 ring-blue-100"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`${config.bg} ${config.text} text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1`}
        >
          <span>{config.icon}</span>
          {config.label}
        </span>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className="text-xs text-gray-400">{notification.time}</span>
          {!notification.read && (
            <span className="w-2 h-2 rounded-full bg-red-500" aria-label="읽지 않음" />
          )}
        </div>
      </div>
      <h3 className="text-sm font-bold text-gray-900">{notification.title}</h3>
      <p className="text-sm text-gray-700 leading-relaxed">{notification.body}</p>
      {notification.taskTitle !== "—" && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-sm font-semibold text-gray-800">
            {notification.taskTitle}
          </span>
        </div>
      )}
      <span className="text-xs font-semibold text-[#1A3BAE]">
        {notification.type === "rework" ? "재작업 시작 →" : "작업 보기 →"}
      </span>
    </button>
  );
}

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  const unread = unreadCount(notifications);

  const handleOpen = (n: AppNotification) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
    );
    router.push(getNotificationHref(n));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex flex-col">
      <header className="bg-white px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-1 -ml-1"
            aria-label="뒤로"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#374151"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-gray-900">알림</h1>
            {unread > 0 && (
              <p className="text-sm text-gray-500 mt-0.5">
                읽지 않은 알림 {unread}건
              </p>
            )}
          </div>
        </div>
        {unread > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="mt-3 text-xs font-semibold text-[#1A3BAE]"
          >
            모두 읽음 처리
          </button>
        )}
      </header>

      <div className="bg-white px-4 py-3 flex gap-2 overflow-x-auto border-b border-gray-100">
        {FILTERS.map(({ key, label }) => {
          const count =
            key === "all"
              ? notifications.length
              : notifications.filter((n) => n.type === key).length;
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                active ? "bg-[#1A3BAE] text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {label}
              <span className="ml-1 opacity-80">({count})</span>
            </button>
          );
        })}
      </div>

      <main className="flex-1 overflow-y-auto px-4 pt-4 pb-8 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-12">
            해당 유형의 알림이 없습니다.
          </p>
        ) : (
          filtered.map((n) => (
            <NotificationCard key={n.id} notification={n} onOpen={handleOpen} />
          ))
        )}
      </main>
    </div>
  );
}
