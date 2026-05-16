import svgPaths from "./svg-nqp57k4eph";
import type { MessagesTopAppBarProps } from "../../app/components/MessagesTopAppBar";
import { MessagesTopAppBar } from "../../app/components/MessagesTopAppBar";
import { cn } from "../../app/components/ui/utils";
import img from "./b68f3a89d5430ed97ecad290443dcd2de140151b.png";
import img1 from "./2b7baea70ae1381a06cb84f6772beb1449cb1208.png";

function Container() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <g id="Container">
          <path d={svgPaths.p1de35f80} fill="var(--fill-0, #434654)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">할 일</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="min-h-[56px] relative shrink-0 w-[118px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] py-[8px] relative size-full">
        <Container />
        <Container1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2940cd80} fill="var(--fill-0, #434654)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">완료</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="min-h-[56px] relative shrink-0 w-[118px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] py-[8px] relative size-full">
        <Container2 />
        <Container3 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p27c98a00} fill="var(--fill-0, #572000)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#572000] text-[13px] whitespace-nowrap">
          <p className="leading-[16px]">메시지</p>
        </div>
      </div>
    </div>
  );
}

function LinkActive() {
  return (
    <div className="bg-[#fe6b00] min-h-[56px] relative rounded-[8px] shrink-0 w-[122.02px]" data-name="Link - (ACTIVE)">
      <div aria-hidden="true" className="absolute border-3 border-[#a04100] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] px-[3px] py-[8px] relative size-full">
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function BottomNavBar() {
  return (
    <div className="absolute bg-[#f8f9ff] bottom-0 content-stretch flex h-[80px] items-center justify-center left-0 pt-px px-[16px] w-[390px] z-[5]" data-name="BottomNavBar">
      <div aria-hidden="true" className="absolute border-[#c3c6d6] border-solid border-t inset-0 pointer-events-none" />
      <Link />
      <Link1 />
      <LinkActive />
    </div>
  );
}

function HeaderTopAppBar({ messagesTopBarProps }: { messagesTopBarProps?: Partial<MessagesTopAppBarProps> }) {
  const { className, ...rest } = messagesTopBarProps ?? {};
  return <MessagesTopAppBar className={cn("z-[3]", className)} {...rest} />;
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[17px] text-center whitespace-nowrap">
        <p className="leading-[26px]">📢 관리자 (2)</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="flex-[1_0_0] h-[56px] min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003d9b] text-[20px] text-center tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">👥 팀원 (3)</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] h-[56px] min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function NavSubSegmentToggle() {
  return (
    <div className="bg-[#f8f9ff] content-stretch flex items-start justify-center pb-px relative shrink-0 w-full z-[2]" data-name="Nav - Sub-Segment Toggle">
      <div aria-hidden="true" className="absolute border-[#c3c6d6] border-b border-solid inset-0 pointer-events-none" />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[14px] relative shrink-0 w-[28px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 14">
        <g id="Container">
          <path d={svgPaths.p3996c880} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#0052cc] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[56px]" data-name="Background">
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[16.667px] right-[-4px] top-[-4px] w-[10px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 16.6667">
        <g id="Container">
          <path d={svgPaths.p3a9f3f00} fill="var(--fill-0, #A04100)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Background />
        <Container13 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">배관 1팀 (8명)</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">오후 2:45</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#434654] text-[14px] text-ellipsis w-full">
        <p className="leading-[20px]">이용접: 오후 작업 V-301부터 시작합니다. 다들 안전...</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#fe6b00] content-stretch flex items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#572000] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">3 새 메시지</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-center pt-[4px] relative shrink-0 w-full" data-name="Container">
      <Background1 />
    </div>
  );
}

function Container14() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container15 />
        <Container16 />
        <Container17 />
      </div>
    </div>
  );
}

function SectionPinnedGroupChat() {
  return (
    <div
      className="relative h-[118px] w-full shrink-0 cursor-pointer rounded-[12px] bg-[#eff4ff]"
      data-name="Section - Pinned Group Chat"
      data-team-announcement="piping-1"
    >
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex gap-[16px] items-start p-[17px] relative size-full">
        <Container11 />
        <Container14 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#737685] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">최근 대화</p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="content-stretch flex gap-[16px] items-center py-[8px] relative shrink-0 w-full" data-name="Divider">
      <div className="bg-[#c3c6d6] flex-[1_0_0] h-px min-w-px relative" data-name="Horizontal Divider" />
      <Container18 />
      <div className="bg-[#c3c6d6] flex-[1_0_0] h-px min-w-px relative" data-name="Horizontal Divider" />
    </div>
  );
}

function Component() {
  return (
    <div className="max-w-[56px] relative shrink-0 size-[54px]" data-name="이용접">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-[-1.85%] max-w-none size-[103.7%] top-[-1.85%]" src={img} />
      </div>
    </div>
  );
}

function Border1() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[56px]" data-name="Border">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Component />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">이용접</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#e6eeff] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003d9b] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">팀원</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container22 />
      <Background2 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">오후 1:12</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[17px] w-full">
        <p className="leading-[26px]">혹시 가스켓 여분 있으세요?</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container20 />
        <Container23 />
      </div>
    </div>
  );
}

function TeamMemberCard() {
  return (
    <div
      className="relative w-full shrink-0 cursor-pointer rounded-[12px] bg-white"
      data-name="Team Member Card 1"
      data-team-peer-chat="yongjeop"
    >
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex gap-[16px] items-start p-[17px] relative size-full">
        <Border1 />
        <Container19 />
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="max-w-[56px] relative shrink-0 size-[54px]" data-name="최신입">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-[-1.85%] max-w-none size-[103.7%] top-[-1.85%]" src={img1} />
      </div>
    </div>
  );
}

function Border2() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[56px]" data-name="Border">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Component1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">최신입</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#e6eeff] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003d9b] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">팀원</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container27 />
      <Background3 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">오전 11:30</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#434654] text-[17px] text-ellipsis w-full">
        <p className="leading-[26px]">선배님, V-203 어떻게 잡아야 하는지...</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container25 />
        <Container28 />
      </div>
    </div>
  );
}

function TeamMemberCard1() {
  return (
    <div
      className="relative w-full shrink-0 cursor-pointer rounded-[12px] bg-white"
      data-name="Team Member Card 2"
      data-team-peer-chat="choesinip"
    >
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex gap-[16px] items-start p-[17px] relative size-full">
        <Border2 />
        <Container24 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 size-[21.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.3333 21.3333">
        <g id="Container">
          <path d={svgPaths.p33f29880} fill="var(--fill-0, #737685)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#e6eeff] relative rounded-[9999px] shrink-0 size-[56px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Container29 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">박기사</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#e6eeff] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003d9b] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">팀원</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container33 />
      <Background4 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container32 />
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">어제</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[17px] w-full">
        <p className="leading-[26px]">내일 아침 TBM 시간에 뵙겠습니다.</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container31 />
        <Container34 />
      </div>
    </div>
  );
}

function AdditionalListItemsForScrollVisualization() {
  return (
    <div
      className="relative w-full shrink-0 cursor-pointer rounded-[12px] bg-white"
      data-name="Team Member Card 3"
      data-team-peer-chat="parkgisa"
    >
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex gap-[16px] items-start p-[17px] relative size-full">
        <BackgroundBorder />
        <Container30 />
      </div>
    </div>
  );
}

function MainMessageListContent() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Main - Message List Content">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative size-full">
        <SectionPinnedGroupChat />
        <Divider />
        <TeamMemberCard />
        <TeamMemberCard1 />
        <AdditionalListItemsForScrollVisualization />
      </div>
    </div>
  );
}

export type HtmlBodyProps = {
  messagesTopBarProps?: Partial<MessagesTopAppBarProps>;
};

export default function HtmlBody({ messagesTopBarProps }: HtmlBodyProps) {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[245px] pt-[64px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 255) 0%, rgb(248, 249, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Html → Body">
      <BottomNavBar />
      <HeaderTopAppBar messagesTopBarProps={messagesTopBarProps} />
      <NavSubSegmentToggle />
      <MainMessageListContent />
    </div>
  );
}