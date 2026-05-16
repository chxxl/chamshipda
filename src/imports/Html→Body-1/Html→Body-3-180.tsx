import svgPaths from "./svg-lmwk73wa5e";
import imgProfile from "./678c0ae83936db8df0d4279b94d4288188e1f724.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[26px] tracking-[-0.52px] w-full">
        <p className="leading-[34px] mb-0">안녕하세요,</p>
        <p className="leading-[34px]">김작업님</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[17px] w-full">
        <p className="leading-[26px]">협력업체 배관 작업자</p>
      </div>
    </div>
  );
}

function UserWelcomeSection() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="User Welcome Section">
      <Heading />
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] w-full">
          <p className="leading-[16px]">오늘 할 일</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] left-0 not-italic text-[#003d9b] text-[24px] top-[18px] whitespace-nowrap">
          <p className="leading-[36px]">5</p>
        </div>
        <div className="absolute h-[12.182px] left-[17.23px] top-[15.05px] w-[11.02px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0195 12.1816">
            <path d={svgPaths.p1031e480} fill="var(--fill-0, #003D9B)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#eff4ff] col-1 justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[13px] relative size-full">
        <Container1 />
        <Paragraph />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#166534] text-[13px] w-full">
          <p className="leading-[16px]">완료</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute h-[15.891px] left-[1.92px] top-[9.7px] w-[21.047px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.0469 15.8906">
            <path d={svgPaths.p2b26dd80} fill="var(--fill-0, #15803D)" id="Icon" />
          </svg>
        </div>
        <div className="absolute h-[12.182px] left-[29.23px] top-[15.05px] w-[11.02px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0195 12.1816">
            <path d={svgPaths.p1031e480} fill="var(--fill-0, #15803D)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#dcfce7] col-2 justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#86efac] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[13px] relative size-full">
        <Container2 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[13px] w-full">
          <p className="leading-[16px]">재작업</p>
        </div>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] left-0 not-italic text-[#ba1a1a] text-[24px] top-[18px] whitespace-nowrap">
          <p className="leading-[36px]">1</p>
        </div>
        <div className="absolute h-[12.182px] left-[17.23px] top-[15.05px] w-[11.02px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0195 12.1816">
            <path d={svgPaths.p1031e480} fill="var(--fill-0, #BA1A1A)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#fee2e2] col-3 justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#fca5a5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[13px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0.01px_0_0] rounded-[12px] shadow-[0px_0px_0px_2px_rgba(186,26,26,0.2)]" data-name="Overlay+Shadow" />
        <Container3 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function SectionQuickStatusBannerHorizontalScrollOrGrid() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_82px] relative shrink-0 w-full" data-name="Section - Quick Status Banner (Horizontal Scroll or Grid)">
      <BackgroundBorder />
      <BackgroundBorder1 />
      <BackgroundBorder2 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">작업 리스트</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">최근 업데이트: 08:42</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container5 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#ba1a1a] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[16px]">재작업 필요</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Background />
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">V-203 게이트밸브 재설치</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <div className="h-[19px] relative shrink-0 w-[22px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 19">
          <path d={svgPaths.p3f976180} fill="var(--fill-0, #BA1A1A)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#93000a] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">박반장:</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[12.05px] relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#93000a] text-[14px] whitespace-nowrap">
        <p className="leading-[20px] mb-0">가스켓 방향이 반대입니다. 재확인 후 다</p>
        <p className="leading-[20px]">시 체결하세요.</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <Container10 />
        <Container11 />
      </div>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(255,218,214,0.3)] relative rounded-[8px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(186,26,26,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start p-[13px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[14px] relative shrink-0 w-[11px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
        <g id="Container">
          <path d="M0 14V0L11 7L0 14V14" fill="var(--fill-0, #572000)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#fe6b00] content-stretch flex gap-[8px] h-[56px] items-center justify-center relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] h-[56px] left-0 right-0 rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0" data-name="Button:shadow" />
      <Container12 />
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#572000] text-[17px] text-center whitespace-nowrap">
        <p className="leading-[26px]">작업 시작</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start p-[20px] relative size-full">
        <Container7 />
        <OverlayBorder />
        <Button />
      </div>
    </div>
  );
}

function Card1Rework() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="CARD 1 (REWORK)">
      <div className="content-stretch flex flex-col items-start overflow-clip pl-[8px] pr-px py-px relative rounded-[inherit] size-full">
        <Container6 />
      </div>
      <div aria-hidden="true" className="absolute border-[#c3c6d6] border-b border-l-8 border-r border-solid border-t inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#0052cc] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[16px]">진행 중</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Background1 />
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">DN50 배관 라인 연결</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container15 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">작업 공정률</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003d9b] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">60%</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#e6eeff] h-[12px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#003d9b] inset-[0_40%_0_0] rounded-[9999px]" data-name="Background" />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Background2 />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[12px] relative shrink-0 w-[14px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12">
        <g id="Container">
          <path d={svgPaths.p1e41c8c0} fill="var(--fill-0, #003D9B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[56px] items-center justify-center p-[2px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#003d9b] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container20 />
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003d9b] text-[17px] text-center whitespace-nowrap">
        <p className="leading-[26px]">이어서 작업</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start p-[20px] relative size-full">
        <Container14 />
        <Container16 />
        <Button1 />
      </div>
    </div>
  );
}

function Card2InProgress() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="CARD 2 (IN PROGRESS)">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container13 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#d5e3fd] content-stretch flex items-center px-[10px] py-[2px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">대기</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Background3 />
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[28px]">용접부 비파괴검사 (NDT) 준비</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container23 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.pc679c40} fill="var(--fill-0, #434654)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[56px] items-center justify-center p-[2px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#737685] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container24 />
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[17px] text-center whitespace-nowrap">
        <p className="leading-[26px]">도면 보기</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start p-[20px] relative size-full">
        <Container22 />
        <Button2 />
      </div>
    </div>
  );
}

function Card3Pending() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="CARD 3 (PENDING)">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container21 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function TaskListSection() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Task List Section">
      <Container4 />
      <Card1Rework />
      <Card2InProgress />
      <Card3Pending />
    </div>
  );
}

function Main() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[24px] items-start pt-[96px] px-[20px] relative size-full">
        <UserWelcomeSection />
        <SectionQuickStatusBannerHorizontalScrollOrGrid />
        <TaskListSection />
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Profile">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgProfile} />
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-[#e6eeff] relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Profile />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003d9b] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[20px]">참ship다</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">5월 16일 토요일</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[78.25px]" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <BackgroundBorder3 />
        <Container26 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[23.333px] relative shrink-0 w-[18.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.6667 23.3333">
        <g id="Container">
          <path d={svgPaths.p16f42880} fill="var(--fill-0, #0D1C2F)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="absolute bg-[#ba1a1a] content-stretch flex h-[21.25px] items-center justify-center p-[2px] right-[8px] rounded-[9999px] top-[6.75px] w-[20px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#f8f9ff] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-white whitespace-nowrap">
        <p className="leading-[16.5px]">3</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container30 />
        <BackgroundBorder4 />
      </div>
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="absolute bg-[#f8f9ff] content-stretch flex h-[64px] items-center justify-between left-0 pb-px px-[20px] top-0 w-[390px]" data-name="Header - TopAppBar">
      <div aria-hidden="true" className="absolute border-[#c3c6d6] border-b border-solid inset-0 pointer-events-none" />
      <Container25 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <g id="Container">
          <path d={svgPaths.p8cc5b00} fill="var(--fill-0, #572000)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#572000] text-[13px] whitespace-nowrap">
          <p className="leading-[16px]">할 일</p>
        </div>
      </div>
    </div>
  );
}

function LinkTabActive() {
  return (
    <div className="bg-[#fe6b00] min-h-[56px] relative rounded-[8px] shrink-0 w-[122.02px]" data-name="Link - tab (Active)">
      <div aria-hidden="true" className="absolute border-3 border-[#a04100] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] px-[3px] py-[8px] relative size-full">
        <Container31 />
        <Container32 />
      </div>
    </div>
  );
}

function Container33() {
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

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">완료</p>
      </div>
    </div>
  );
}

function LinkTab() {
  return (
    <div className="min-h-[56px] relative shrink-0 w-[118px]" data-name="Link - tab">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] py-[8px] relative size-full">
        <Container33 />
        <Container34 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p3ffd6800} fill="var(--fill-0, #434654)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">메시지</p>
      </div>
    </div>
  );
}

function LinkTab1() {
  return (
    <div className="min-h-[56px] relative shrink-0 w-[118px]" data-name="Link - tab">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] py-[8px] relative size-full">
        <Container35 />
        <Container36 />
      </div>
    </div>
  );
}

function BottomNavBar() {
  return (
    <div className="absolute bg-[#f8f9ff] bottom-0 content-stretch flex h-[80px] items-center justify-center left-0 pt-px px-[16px] w-[390px]" data-name="BottomNavBar">
      <div aria-hidden="true" className="absolute border-[#c3c6d6] border-solid border-t inset-0 pointer-events-none" />
      <LinkTabActive />
      <LinkTab />
      <LinkTab1 />
    </div>
  );
}

export default function HtmlBody() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[140px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 255) 0%, rgb(248, 249, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Html → Body">
      <Main />
      <HeaderTopAppBar />
      <BottomNavBar />
    </div>
  );
}