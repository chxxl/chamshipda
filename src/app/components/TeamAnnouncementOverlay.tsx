import { useId, useMemo, useState } from "react";
import { MessageSearchOverlay } from "./MessageSearchOverlay";
import { MessagesTopAppBar } from "./MessagesTopAppBar";

type Notice = {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
};

const PIPING_TEAM_1_NOTICES: Notice[] = [
  {
    id: "1",
    title: "오후 작업 및 TBM 안내",
    body:
      "오늘 오후 작업은 V-301 라인부터 순차 진행합니다. TBM은 13:15 배관 1팀 조립장 앞에서 진행합니다. 전원 안전모·안전고리·보안면 착용을 확인한 뒤 입장해 주세요. 지연 시 현장관리자에게 사전 연락 바랍니다.",
    author: "박반장 · 현장관리자",
    date: "2026. 5. 16. 오후 2:45",
  },
  {
    id: "2",
    title: "가동 전 점검 체크리스트 제출",
    body:
      "금일 16시까지 배관 1팀 구역 가동 전 점검 체크리스트를 협업 앱에 업로드해 주세요. 누락 시 가동 승인이 보류될 수 있습니다.",
    author: "박반장 · 현장관리자",
    date: "2026. 5. 15. 오전 9:30",
  },
  {
    id: "3",
    title: "주간 안전 교육 참석",
    body: "금주 금요일 07:00 본관 2층 교육장에서 배관 직종 통합 안전 교육이 있습니다. 배관 1팀 전원 필참입니다.",
    author: "안전관리자",
    date: "2026. 5. 14. 오후 4:10",
  },
];

type TeamAnnouncementOverlayProps = {
  onClose: () => void;
};

export function TeamAnnouncementOverlay({ onClose }: TeamAnnouncementOverlayProps) {
  const titleId = useId();
  const [searchOpen, setSearchOpen] = useState(false);

  const noticeSearchItems = useMemo(
    () =>
      PIPING_TEAM_1_NOTICES.map((n) => ({
        id: `notice-${n.id}`,
        title: n.title,
        body: n.body,
        meta: `${n.author} · ${n.date}`,
      })),
    [],
  );

  return (
    <div
      className="fixed inset-0 z-[200] flex justify-center bg-black/35"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className="relative flex h-full w-full max-w-[390px] flex-col bg-[#f8f9ff]"
        onClick={(e) => e.stopPropagation()}
      >
        <MessagesTopAppBar
          className="z-[1] shrink-0"
          fixedToCanvas={false}
          titleLabelId={titleId}
          onBackClick={onClose}
          onSearchClick={() => setSearchOpen(true)}
        />

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-8 pt-4">
          <div className="mb-5">
            <p className="font-['Pretendard:Bold',sans-serif] text-[22px] leading-[30px] tracking-[-0.3px] text-[#0d1c2f]">
              배관 1팀
            </p>
            <p className="mt-1 font-['Pretendard:Medium',sans-serif] text-[14px] leading-[20px] text-[#737685]">
              관리자가 등록한 공지사항입니다.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {PIPING_TEAM_1_NOTICES.map((n) => (
              <li
                key={n.id}
                className="rounded-[12px] border border-[#c3c6d6] border-solid bg-white p-4 shadow-sm"
              >
                <p className="font-['Pretendard:Semi_Bold',sans-serif] text-[16px] leading-[24px] text-[#003d9b]">
                  {n.title}
                </p>
                <p className="mt-2 whitespace-pre-wrap font-['Pretendard:Medium',sans-serif] text-[15px] leading-[23px] text-[#0d1c2f]">
                  {n.body}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#eef0f6] pt-3">
                  <span className="font-['Pretendard:Medium',sans-serif] text-[12px] text-[#0052cc]">
                    {n.author}
                  </span>
                  <span className="font-['Pretendard:Regular',sans-serif] text-[12px] text-[#737685]">
                    {n.date}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <MessageSearchOverlay
          variant="nested"
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          items={noticeSearchItems}
        />
      </div>
    </div>
  );
}
