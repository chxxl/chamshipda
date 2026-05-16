export type ConversationTab = "admin" | "team";

export interface ChatBubble {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

export interface ConversationThread {
  threadId: string;
  tab: ConversationTab;
  name: string;
  role: string;
  hasPhoto: boolean;
  photoColor?: string;
  initial: string;
  preview: string;
  time: string;
  unread: boolean;
  linkedTask?: string;
  messages: ChatBubble[];
}

export const CONVERSATIONS: ConversationThread[] = [
  {
    threadId: "admin-1",
    tab: "admin",
    name: "박반장",
    role: "현장관리자",
    hasPhoto: true,
    photoColor: "from-blue-500 to-blue-700",
    initial: "박",
    preview: "V-203 재작업 부탁드립니다. 도면 기준과 실제 설치 각도가 상이합니다.",
    time: "오전 10:43",
    unread: true,
    linkedTask: "V-203 게이트밸브 재설치",
    messages: [
      {
        id: "m1",
        sender: "them",
        text: "김작업님, V-203 게이트밸브 검수 결과 반려 처리됐습니다.",
        time: "오전 10:30",
      },
      {
        id: "m2",
        sender: "them",
        text: "V-203 재작업 부탁드립니다. 도면 기준과 실제 설치 각도가 상이합니다.",
        time: "오전 10:43",
      },
      {
        id: "m3",
        sender: "me",
        text: "네, 확인했습니다. 가스켓 방향 재확인 후 바로 재작업 진행하겠습니다.",
        time: "오전 10:48",
      },
      {
        id: "m4",
        sender: "them",
        text: "도면 Rev.B 기준으로 설치해 주세요. 완료 후 사진 2장 올려주시면 됩니다.",
        time: "오전 10:52",
      },
    ],
  },
  {
    threadId: "admin-2",
    tab: "admin",
    name: "이품질",
    role: "품질관리자",
    hasPhoto: true,
    photoColor: "from-orange-400 to-orange-600",
    initial: "이",
    preview: "오늘 검수 시간 변경 안내 드립니다. 오후 2시에서 4시로 변경되었습니다.",
    time: "오전 09:12",
    unread: true,
    messages: [
      {
        id: "m1",
        sender: "them",
        text: "안녕하세요, 오늘 검수 일정 공유드립니다.",
        time: "오전 09:00",
      },
      {
        id: "m2",
        sender: "them",
        text: "오늘 검수 시간 변경 안내 드립니다. 오후 2시에서 4시로 변경되었습니다.",
        time: "오전 09:12",
      },
      {
        id: "m3",
        sender: "me",
        text: "확인했습니다. 4시에 현장 대기하겠습니다.",
        time: "오전 09:20",
      },
    ],
  },
  {
    threadId: "admin-3",
    tab: "admin",
    name: "김안전",
    role: "안전팀",
    hasPhoto: false,
    initial: "김",
    preview: "금일 작업 전 TBM 사진 업로드 누락되었습니다. 확인 바랍니다.",
    time: "어제",
    unread: false,
    messages: [
      {
        id: "m1",
        sender: "them",
        text: "금일 작업 전 TBM 사진 업로드 누락되었습니다. 확인 바랍니다.",
        time: "어제 오후 4:10",
      },
    ],
  },
  {
    threadId: "team-1",
    tab: "team",
    name: "최용접",
    role: "용접팀",
    hasPhoto: true,
    photoColor: "from-green-400 to-green-600",
    initial: "최",
    preview: "오늘 용접 작업 구역 변경됐나요? 확인 부탁드립니다.",
    time: "오전 11:20",
    unread: true,
    messages: [
      {
        id: "m1",
        sender: "them",
        text: "형, 오늘 용접 작업 구역 변경됐나요? 확인 부탁드립니다.",
        time: "오전 11:20",
      },
    ],
  },
  {
    threadId: "team-2",
    tab: "team",
    name: "정배관",
    role: "배관팀",
    hasPhoto: true,
    photoColor: "from-purple-400 to-purple-600",
    initial: "정",
    preview: "DN50 자재 입고 완료됐습니다. 창고에서 수령해주세요.",
    time: "오전 09:55",
    unread: false,
    messages: [
      {
        id: "m1",
        sender: "them",
        text: "DN50 자재 입고 완료됐습니다. 창고에서 수령해주세요.",
        time: "오전 09:55",
      },
      {
        id: "m2",
        sender: "me",
        text: "감사합니다. 점심 후에 창고 가서 받을게요.",
        time: "오전 10:05",
      },
    ],
  },
];

export function getConversation(threadId: string): ConversationThread | undefined {
  return CONVERSATIONS.find((c) => c.threadId === threadId);
}

export function getConversationsByTab(tab: ConversationTab): ConversationThread[] {
  return CONVERSATIONS.filter((c) => c.tab === tab);
}

export function unreadCountByTab(tab: ConversationTab): number {
  return getConversationsByTab(tab).filter((c) => c.unread).length;
}
