export interface WorkTask {
  id: string;
  title: string;
  statusLabel: string;
  statusBadgeClass: string;
  drawingRev: string;
  zone: string;
  isoLabel: string;
  timeRemaining?: string;
  isRework: boolean;
  feedback?: { author: string; message: string };
  materials: { key: string; label: string }[];
  cautionTitle: string;
  cautionSubtitle: string;
  estimatedMinutes: number;
}

export const DEFAULT_WORK_TASK_ID = "2";

export const WORK_TASKS: Record<string, WorkTask> = {
  "1": {
    id: "1",
    title: "V-203 게이트밸브 재설치",
    statusLabel: "재작업 필요",
    statusBadgeClass: "bg-red-500",
    drawingRev: "V-203 Rev.B",
    zone: "구역 B-2",
    isoLabel: "ISO VIEW - VALVE_V203",
    timeRemaining: "오늘 17:00까지",
    isRework: true,
    feedback: {
      author: "박반장",
      message: "가스켓 방향이 반대입니다. 재확인 후 다시 체결하세요.",
    },
    materials: [
      { key: "item1", label: "게이트밸브 V-203 (재검수용)" },
      { key: "item2", label: "가스켓 세트 · 체결 볼트 (8개입)" },
    ],
    cautionTitle: "가스켓 방향 확인 필수",
    cautionSubtitle: "도면 Rev.B 기준 설치",
    estimatedMinutes: 30,
  },
  "2": {
    id: "2",
    title: "DN50 배관 라인 연결",
    statusLabel: "진행 중",
    statusBadgeClass: "bg-blue-600",
    drawingRev: "P-101 Rev.D",
    zone: "구역 A-3",
    isoLabel: "ISO VIEW - SHIP_B_004",
    timeRemaining: "32분 남음",
    isRework: false,
    materials: [
      { key: "item1", label: "DN50 SCH40 강관 6m × 2" },
      { key: "item2", label: "플랜지 및 볼트 세트 (12개입)" },
    ],
    cautionTitle: "화기작업 허가 필요",
    cautionSubtitle: "주의사항",
    estimatedMinutes: 45,
  },
};

export function getWorkTask(taskId: string | null): WorkTask {
  if (taskId && WORK_TASKS[taskId]) {
    return WORK_TASKS[taskId];
  }
  return WORK_TASKS[DEFAULT_WORK_TASK_ID];
}

export function workPageHref(taskId: string): string {
  return `/work?taskId=${taskId}`;
}
