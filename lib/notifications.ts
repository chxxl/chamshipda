export type NotificationType = "new" | "rework" | "update";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  taskTitle: string;
  time: string;
  read: boolean;
  /** 연결된 작업 ID (재작업 → /work) */
  taskId?: string;
  /** 이동 경로 */
  href: string;
}

export const NOTIFICATION_TYPE_CONFIG: Record<
  NotificationType,
  { label: string; bg: string; text: string; icon: string }
> = {
  new: {
    label: "신규 작업",
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: "✨",
  },
  rework: {
    label: "재작업",
    bg: "bg-red-100",
    text: "text-red-700",
    icon: "⚠️",
  },
  update: {
    label: "변경 안내",
    bg: "bg-amber-100",
    text: "text-amber-800",
    icon: "📋",
  },
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    type: "rework",
    title: "검수 반려 · 재작업 필요",
    body: "박반장님이 V-203 게이트밸브 작업을 반려했습니다. 가스켓 방향을 재확인해 주세요.",
    taskTitle: "V-203 게이트밸브 재설치",
    time: "10분 전",
    read: false,
    taskId: "1",
    href: "/work?taskId=1",
  },
  {
    id: "n2",
    type: "new",
    title: "신규 작업이 배정되었습니다",
    body: "DN80 배관 브랜치 연결 작업이 오늘 일정에 추가되었습니다.",
    taskTitle: "DN80 배관 브랜치 연결",
    time: "1시간 전",
    read: false,
    href: "/wait",
  },
  {
    id: "n3",
    type: "new",
    title: "신규 작업이 배정되었습니다",
    body: "용접부 비파괴검사(NDT) 준비 작업이 할당되었습니다. 도면을 먼저 확인하세요.",
    taskTitle: "용접부 비파괴검사 (NDT) 준비",
    time: "오전 08:30",
    read: false,
    href: "/wait",
  },
  {
    id: "n4",
    type: "update",
    title: "검수 일정 변경",
    body: "이품질님: 오늘 검수 시간이 오후 2시에서 4시로 변경되었습니다.",
    taskTitle: "—",
    time: "오전 09:12",
    read: true,
    href: "/message",
  },
];

export function unreadCount(notifications: AppNotification[]): number {
  return notifications.filter((n) => !n.read).length;
}

/** 알림 유형에 맞는 이동 경로 */
export function getNotificationHref(n: AppNotification): string {
  if (n.type === "rework" && n.taskId) {
    return `/work?taskId=${n.taskId}`;
  }
  return n.href;
}
