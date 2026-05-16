import svgPaths from "./svg-9tfx2oxlm9";
import type { MessagesTopAppBarProps } from "../../app/components/MessagesTopAppBar";
import { MessagesTopAppBar } from "../../app/components/MessagesTopAppBar";
import imgAvatar from "./c31ed5908a1f4148d19e9c25b87d81829372cab8.png";
import imgAvatar1 from "./432a1dfab27417edcfb4d5a0d545c0c370d7375d.png";

function Container() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0052cc] text-[20px] text-center tracking-[-0.2px] whitespace-nowrap">
          <p className="leading-[28px]">📢 관리자</p>
        </div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#ba1a1a] min-w-[20px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center min-w-[inherit] pl-[6.33px] pr-[6.34px] py-[2px] relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
          <p className="leading-[18px]">2</p>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="flex-[1_0_0] h-[56px] min-w-px relative z-[2]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#0052cc] border-b-3 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center pb-[3px] relative size-full">
        <Container />
        <Background />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[20px] text-center tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">👥 팀원</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">(5)</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="flex-[1_0_0] h-[56px] min-w-px relative z-[1]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center relative size-full">
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

function NavSubSegmentToggle() {
  return (
    <div className="bg-[#f8f9ff] content-stretch flex isolate items-start justify-center pb-px relative shrink-0 w-full" data-name="Nav - Sub-Segment Toggle">
      <div aria-hidden="true" className="absolute border-[#c3c6d6] border-b border-solid inset-0 pointer-events-none" />
      <Button />
      <Button1 />
    </div>
  );
}

function Avatar() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[56px]" data-name="Avatar">
      <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAvatar} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#0052cc] border-solid inset-0 rounded-[9999px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
          <p className="leading-[18px]">M</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="absolute bg-[#003d9b] bottom-[-4px] content-stretch flex items-center justify-center p-[2px] right-[-4px] rounded-[9999px] size-[24px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#eff4ff] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container5 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Avatar />
      <BackgroundBorder />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">박반장</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#d5e3fd] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">현장관리자</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container9 />
      <Background1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">오전 10:45</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[17px] w-full">
        <p className="leading-[26px] mb-0">V-203 재작업 부탁드립니다. 도면</p>
        <p className="leading-[26px]">기준과 실제 설치 각도가 상이합니다.</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[10px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 10">
        <g id="Container">
          <path d={svgPaths.pc80eb80} fill="var(--fill-0, #003D9B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003d9b] text-[13px] whitespace-nowrap">
          <p className="leading-[16px]">🔗 V-203 게이트밸브 재설치</p>
        </div>
      </div>
    </div>
  );
}

function ContextLink() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Context Link">
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[13px] relative size-full">
          <Container11 />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative self-stretch" data-name="Container">
      <Container7 />
      <Container10 />
      <ContextLink />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[138px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <Container4 />
        <Container6 />
      </div>
    </div>
  );
}

function SectionCard1Unread() {
  return (
    <div
      className="bg-[#eff4ff] relative shrink-0 w-full cursor-pointer rounded-[12px]"
      data-name="Section - CARD 1 (UNREAD)"
      data-admin-chat-thread
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[17px] relative size-full">
          <Container3 />
          <div className="absolute bg-[#ba1a1a] right-[17px] rounded-[9999px] size-[10px] top-[17px]" data-name="Unread Badge Dot" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#0052cc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Avatar1() {
  return (
    <div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[56px]" data-name="Avatar">
      <div className="absolute inset-0 overflow-hidden rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAvatar1} />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#0052cc] border-solid inset-0 rounded-[9999px]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
          <p className="leading-[18px]">M</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="absolute bg-[#003d9b] bottom-[-4px] content-stretch flex items-center justify-center p-[2px] right-[-4px] rounded-[9999px] size-[24px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#eff4ff] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container15 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Avatar1 />
      <BackgroundBorder1 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">이품질</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#d5e3fd] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">품질관리자</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container19 />
      <Background2 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">오전 09:12</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[17px] w-full">
        <p className="leading-[26px] mb-0">오늘 검수 시간 변경 안내 드립니다.</p>
        <p className="leading-[26px]">오후 2시에서 4시로 변경되었습니다.</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative self-stretch" data-name="Container">
      <Container17 />
      <Container20 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <Container14 />
        <Container16 />
      </div>
    </div>
  );
}

function SectionCard2Unread() {
  return (
    <div
      className="bg-[#eff4ff] relative shrink-0 w-full cursor-pointer rounded-[12px]"
      data-name="Section - CARD 2 (UNREAD)"
      data-admin-chat-thread
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[17px] relative size-full">
          <Container13 />
          <div className="absolute bg-[#ba1a1a] right-[17px] rounded-[9999px] size-[10px] top-[17px]" data-name="Unread Badge Dot" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#0052cc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p85bff00} fill="var(--fill-0, #737685)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#d5e3fd] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[56px]" data-name="Background">
      <Container23 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Background3 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">김안전</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#e6eeff] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#737685] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">안전팀</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container27 />
      <Background4 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#737685] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">어제</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[17px] w-full">
        <p className="leading-[26px] mb-0">금일 작업 전 TBM 사진 업로드 누락</p>
        <p className="leading-[26px]">되었습니다. 확인 바랍니다.</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative self-stretch" data-name="Container">
      <Container25 />
      <Container28 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <Container22 />
        <Container24 />
      </div>
    </div>
  );
}

function SectionPreviousMessagesRead() {
  return (
    <div
      className="relative w-full shrink-0 cursor-pointer rounded-[12px] bg-[#f8f9ff] opacity-70"
      data-name="Section - PREVIOUS MESSAGES (READ)"
      data-admin-chat-thread
    >
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col items-start p-[17px] relative size-full">
        <Container21 />
      </div>
    </div>
  );
}

function MainMessageListCanvas() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main - Message List Canvas">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative size-full">
        <SectionCard1Unread />
        <SectionCard2Unread />
        <SectionPreviousMessagesRead />
      </div>
    </div>
  );
}

function HeaderTopAppBar({ messagesTopBarProps }: { messagesTopBarProps?: Partial<MessagesTopAppBarProps> }) {
  return <MessagesTopAppBar {...messagesTopBarProps} />;
}

function Container32() {
  return (
    <div className="h-[23.333px] relative shrink-0 w-[21px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 23.3333">
        <g id="Container">
          <path d={svgPaths.p231251c0} fill="var(--fill-0, #434654)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[16px]">할 일</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="min-h-[56px] relative shrink-0 w-[118px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] py-[6px] relative size-full">
        <Container32 />
        <Container33 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 size-[23.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3333 23.3333">
        <g id="Container">
          <path d={svgPaths.p19faec70} fill="var(--fill-0, #434654)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[16px]">완료</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="min-h-[56px] relative shrink-0 w-[118px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] py-[6px] relative size-full">
        <Container34 />
        <Container35 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0 size-[23.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.3333 23.3333">
        <g id="Container">
          <path d={svgPaths.p283f2680} fill="var(--fill-0, #572000)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container37() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#572000] text-[13px] text-center whitespace-nowrap">
          <p className="leading-[16px]">메시지</p>
        </div>
      </div>
    </div>
  );
}

function ContextualBadge() {
  return (
    <div className="absolute bg-white h-[19px] right-[27px] rounded-[9999px] top-[9px] w-[16px]" data-name="Contextual Badge">
      <div aria-hidden="true" className="absolute border-2 border-[#a04100] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <div className="flex flex-col font-['Pretendard:Extra_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a04100] text-[10px] text-center whitespace-nowrap">
          <p className="leading-[15px]">2</p>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#fe6b00] min-h-[56px] relative rounded-[8px] shrink-0 w-[122.02px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-3 border-[#a04100] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] px-[3px] py-[6px] relative size-full">
        <Container36 />
        <Container37 />
        <ContextualBadge />
      </div>
    </div>
  );
}

function BottomNavBar() {
  return (
    <div className="absolute bg-[#f8f9ff] bottom-[64px] content-stretch flex h-[80px] items-center justify-center left-0 pt-px px-[16px] w-[390px]" data-name="BottomNavBar">
      <div aria-hidden="true" className="absolute border-[#c3c6d6] border-solid border-t inset-0 pointer-events-none" />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

export type HtmlBodyProps = {
  messagesTopBarProps?: Partial<MessagesTopAppBarProps>;
};

export default function HtmlBody({ messagesTopBarProps }: HtmlBodyProps) {
  return (
    <div className="content-stretch flex flex-col items-start pb-[347px] pt-[64px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 255) 0%, rgb(248, 249, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Html → Body">
      <NavSubSegmentToggle />
      <MainMessageListCanvas />
      <HeaderTopAppBar messagesTopBarProps={messagesTopBarProps} />
      <BottomNavBar />
    </div>
  );
}