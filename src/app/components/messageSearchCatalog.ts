import type { MessageSearchHit } from "./MessageSearchOverlay";

export const ADMIN_MESSAGE_SEARCH_HITS: MessageSearchHit[] = [
  {
    id: "admin-1",
    title: "박반장 · 현장관리자",
    meta: "오전 10:45",
    body: "V-203 재작업 부탁드립니다. 도면 기준과 실제 설치 각도가 상이합니다. 🔗 V-203 게이트밸브 재설치",
  },
  {
    id: "admin-2",
    title: "이품질 · 품질관리자",
    meta: "오전 09:12",
    body: "오늘 검수 시간 변경 안내 드립니다. 오후 2시에서 4시로 변경되었습니다.",
  },
  {
    id: "admin-3",
    title: "김안전 · 안전팀",
    meta: "어제",
    body: "금일 작업 전 TBM 사진 업로드 누락 되었습니다. 확인 바랍니다.",
  },
];

export const TEAM_MESSAGE_SEARCH_HITS: MessageSearchHit[] = [
  {
    id: "team-1",
    title: "배관 1팀 (단톡)",
    meta: "오후 2:45 · 3 새 메시지",
    body: "이용접: 오후 작업 V-301부터 시작합니다. 다들 안전모 착용 부탁드립니다.",
  },
  {
    id: "team-2",
    title: "이용접 · 팀원",
    meta: "오후 1:12",
    body: "혹시 가스켓 여분 있으세요?",
  },
  {
    id: "team-3",
    title: "최신입 · 팀원",
    meta: "오전 11:30",
    body: "선배님, V-203 어떻게 잡아야 하는지 알려주실 수 있을까요?",
  },
  {
    id: "team-4",
    title: "박기사 · 팀원",
    meta: "어제",
    body: "내일 아침 TBM 시간에 뵙겠습니다.",
  },
];
