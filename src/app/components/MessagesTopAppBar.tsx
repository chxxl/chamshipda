import svgPaths from "../../imports/Html→Body-4/svg-9tfx2oxlm9";
import { cn } from "./ui/utils";

export type MessagesTopAppBarProps = {
  className?: string;
  /** true: 메시지 목록 화면처럼 캔버스 상단 고정. false: 오버레이 등에서 일반 흐름으로 배치 */
  fixedToCanvas?: boolean;
  /** 대화·상세 진입 시 '메시지' 왼쪽에 표시되는 뒤로가기 */
  onBackClick?: () => void;
  onTitleClick?: () => void;
  onSearchClick?: () => void;
  /** 접근성용 제목 id (대화 상자 aria-labelledby 등) */
  titleLabelId?: string;
};

export function MessagesTopAppBar({
  className,
  fixedToCanvas = true,
  onBackClick,
  onTitleClick,
  onSearchClick,
  titleLabelId,
}: MessagesTopAppBarProps) {
  const titleInner = (
    <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003d9b] text-[26px] tracking-[-0.52px] whitespace-nowrap">
      <p id={titleLabelId} className="leading-[34px]">
        메시지
      </p>
    </div>
  );

  const useTitleAsButton = Boolean(onTitleClick) && !onBackClick;

  const titleBlock = useTitleAsButton ? (
    <button
      type="button"
      onClick={onTitleClick}
      className="relative shrink-0 rounded-md border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#003d9b]/30"
      data-name="Heading 1"
      aria-label="대화 목록으로 돌아가기"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        {titleInner}
      </div>
    </button>
  ) : (
    <div className="relative shrink-0" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        {titleInner}
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "flex h-[64px] content-stretch items-center justify-between bg-[#f8f9ff] px-[20px] pb-px",
        fixedToCanvas ? "absolute left-0 top-0 w-[390px]" : "relative w-full shrink-0",
        className,
      )}
      data-name="Header - TopAppBar"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 border-b border-solid border-[#c3c6d6]" />
      <div className="relative z-[1] flex min-w-0 items-center gap-1">
        {onBackClick ? (
          <button
            type="button"
            onClick={onBackClick}
            className="-ml-1 flex size-[44px] shrink-0 items-center justify-center rounded-lg border-0 bg-transparent p-0 font-['Pretendard:Bold',sans-serif] text-[26px] leading-none text-[#003d9b] outline-none hover:bg-[#e8edfc]/90 focus-visible:ring-2 focus-visible:ring-[#003d9b]/30"
            aria-label="뒤로가기"
            data-name="Button - Back"
          >
            &lt;
          </button>
        ) : null}
        {titleBlock}
      </div>
      <div className="relative shrink-0" data-name="Container">
        <div className="relative flex shrink-0 items-center justify-end border-0 border-transparent bg-clip-padding">
          <button
            type="button"
            onClick={onSearchClick}
            className="relative flex size-[48px] shrink-0 items-center justify-center rounded-[8px] border-0 bg-transparent p-0 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] hover:bg-[#e8edfc]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003d9b]/25"
            data-name="Button"
            aria-label="메시지 검색"
          >
            <div className="relative size-[21px] shrink-0" data-name="Container">
              <svg className="absolute inset-0 block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
                <g id="Container">
                  <path d={svgPaths.p23e76100} fill="var(--fill-0, #434654)" id="Icon" />
                </g>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
