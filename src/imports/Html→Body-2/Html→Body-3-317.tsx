import svgPaths from "./svg-txmenlexgd";
import imgWorkPhoto from "./3bebd155df32911c3714c15861523c07f7cdc1d7.png";
import imgPaintDetail1 from "./ff00b0889179f24bc05e4f29990855c0e24654d6.png";
import imgPaintDetail2 from "./138d24ef8e51ef598a09f5ff8be5136e90e8a6d2.png";
import imgWorkerProfile from "./3931864b2e40ef32d1756b92e85777529ec1f67a.png";

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[17px] w-full">
        <p className="leading-[26px]">반가워요, 김철수 작업자님</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] w-full">
        <p className="leading-[28px]">오늘의 작업 현황입니다</p>
      </div>
    </div>
  );
}

function GreetingSection() {
  return (
    <div className="content-stretch flex flex-col items-start py-[16px] relative shrink-0 w-full" data-name="Greeting Section">
      <Container />
      <Heading1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] text-center whitespace-nowrap">
          <p className="leading-[16px]">할 일</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white col-1 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center p-[13px] relative size-full">
          <Container1 />
          <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003d9b] text-[20px] text-center tracking-[-0.2px] whitespace-nowrap">
            <p className="leading-[28px]">5</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] text-center whitespace-nowrap">
          <p className="leading-[16px]">완료</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white col-2 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center p-[13px] relative size-full">
          <Container2 />
          <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a04100] text-[20px] text-center tracking-[-0.2px] whitespace-nowrap">
            <p className="leading-[28px]">14</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] text-center whitespace-nowrap">
          <p className="leading-[16px]">재작업</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white col-3 justify-self-stretch relative rounded-[8px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center p-[13px] relative size-full">
          <Container3 />
          <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[20px] text-center tracking-[-0.2px] whitespace-nowrap">
            <p className="leading-[28px]">1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickStatusBanner3MiniCards() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_74px] relative shrink-0 w-full" data-name="Quick Status Banner (3 mini cards)">
      <BackgroundBorder />
      <BackgroundBorder1 />
      <BackgroundBorder2 />
    </div>
  );
}

function Button() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#a04100] border-b-3 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[19px] pt-[16px] relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a04100] text-[13px] text-center whitespace-nowrap">
          <p className="leading-[16px]">✅ 승인됨 (12)</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[18px] pt-[17px] relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] text-center whitespace-nowrap">
          <p className="leading-[16px]">⏱ 검토 중 (2)</p>
        </div>
      </div>
    </div>
  );
}

function SubSegmentTabRework() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[18px] pt-[17px] relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] text-center whitespace-nowrap">
          <p className="leading-[16px]">🔁 재작업 (3)</p>
        </div>
      </div>
    </div>
  );
}

function SubSegmentToggle() {
  return (
    <div className="content-stretch flex items-start justify-center pb-px relative shrink-0 w-full" data-name="Sub-Segment Toggle">
      <div aria-hidden="true" className="absolute border-[#c3c6d6] border-b border-solid inset-0 pointer-events-none" />
      <Button />
      <Button1 />
      <SubSegmentTabRework />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 size-[13.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
        <g id="Container">
          <path d={svgPaths.p1ba9de80} fill="var(--fill-0, #2E7D32)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e8f5e9] content-stretch flex gap-[4px] items-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <Container5 />
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">승인됨</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
          <p className="leading-[28px]">V-101 게이트밸브 설치</p>
        </div>
        <Background />
      </div>
    </div>
  );
}

function WorkPhoto() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Work photo">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgWorkPhoto} />
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 size-[48px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <WorkPhoto />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`"박반장: 깔끔하게 잘 됐습니다 👍"`}</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#eff4ff] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
          <BackgroundBorder3 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Card 1">
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container4 />
        <Background1 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 size-[13.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
        <g id="Container">
          <path d={svgPaths.p1ba9de80} fill="var(--fill-0, #2E7D32)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#e8f5e9] content-stretch flex gap-[4px] items-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <Container8 />
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">승인됨</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
          <p className="leading-[28px]">메인 라인 압력 테스트</p>
        </div>
        <Background2 />
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#eff4ff] relative rounded-[8px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[12px] relative size-full">
        <div className="flex flex-col font-['Pretendard:Italic',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[14px] whitespace-nowrap">
          <p className="leading-[20px]">{`"박반장: 테스트 결과 양호"`}</p>
        </div>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#e6eeff] relative rounded-[4px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start pb-[4.5px] pt-[3px] px-[8px] relative size-full">
        <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[11px] whitespace-nowrap">
          <p className="leading-[16.5px]">압력: 12.5 bar</p>
        </div>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#e6eeff] relative rounded-[4px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start pb-[4.5px] pt-[3px] px-[8px] relative size-full">
        <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[11px] whitespace-nowrap">
          <p className="leading-[16.5px]">시간: 09:30</p>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <Background4 />
        <Background5 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Card 2">
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[17px] relative size-full">
        <Container7 />
        <Background3 />
        <Container9 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 size-[13.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
        <g id="Container">
          <path d={svgPaths.p1ba9de80} fill="var(--fill-0, #2E7D32)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#e8f5e9] content-stretch flex gap-[4px] items-center px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <Container11 />
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">승인됨</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <div className="flex flex-col font-['Pretendard:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
          <p className="leading-[28px]">DN80 라인 도색</p>
        </div>
        <Background6 />
      </div>
    </div>
  );
}

function PaintDetail() {
  return (
    <div className="col-1 h-[80px] justify-self-stretch pointer-events-none relative rounded-[8px] row-1 shrink-0" data-name="Paint detail 1">
      <div className="absolute inset-0 overflow-hidden rounded-[8px]">
        <img alt="" className="absolute h-[125%] left-0 max-w-none top-[-12.5%] w-full" src={imgPaintDetail1} />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 rounded-[8px]" />
    </div>
  );
}

function PaintDetail1() {
  return (
    <div className="col-2 h-[80px] justify-self-stretch pointer-events-none relative rounded-[8px] row-1 shrink-0" data-name="Paint detail 2">
      <div className="absolute inset-0 overflow-hidden rounded-[8px]">
        <img alt="" className="absolute h-[125%] left-0 max-w-none top-[-12.5%] w-full" src={imgPaintDetail2} />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 rounded-[8px]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p2bb32400} fill="var(--fill-0, #434654)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-[#e6eeff] col-3 content-stretch flex h-[80px] items-center justify-center justify-self-stretch p-px relative rounded-[8px] row-1 shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <Container13 />
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_80px] relative size-full">
        <PaintDetail />
        <PaintDetail1 />
        <BackgroundBorder4 />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Card 3">
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[17px] relative size-full">
        <Container10 />
        <Container12 />
      </div>
    </div>
  );
}

function TaskListSection() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start py-[8px] relative shrink-0 w-full" data-name="Task List Section">
      <Card />
      <Card1 />
      <Card2 />
    </div>
  );
}

function Main() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[12px] items-start pt-[84px] px-[20px] relative size-full">
        <GreetingSection />
        <QuickStatusBanner3MiniCards />
        <SubSegmentToggle />
        <TaskListSection />
      </div>
    </div>
  );
}

function WorkerProfile() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Worker Profile">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgWorkerProfile} />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[40px]" data-name="Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <WorkerProfile />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003d9b] text-[26px] tracking-[-0.52px] whitespace-nowrap">
        <p className="leading-[34px]">참ship다</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Border />
        <Heading />
      </div>
    </div>
  );
}

function Container15() {
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

function Button2() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[56px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container15 />
      </div>
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="absolute bg-[#f8f9ff] content-stretch flex h-[64px] items-center justify-between left-0 pb-px px-[20px] top-0 w-[390px]" data-name="Header - TopAppBar">
      <div aria-hidden="true" className="absolute border-[#c3c6d6] border-b border-solid inset-0 pointer-events-none" />
      <Container14 />
      <Button2 />
    </div>
  );
}

function Container16() {
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

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0" data-name="Margin">
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[16px]">할 일</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="min-h-[56px] relative shrink-0 w-[118px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] py-[6px] relative size-full">
        <Margin />
        <Container17 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2940cd80} fill="var(--fill-0, #572000)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[4px] relative size-full">
        <Container18 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#572000] text-[13px] text-center whitespace-nowrap">
          <p className="leading-[16px]">완료</p>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#fe6b00] min-h-[56px] relative rounded-[8px] shrink-0 w-[122.02px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-3 border-[#a04100] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] px-[3px] py-[6px] relative size-full">
        <Margin1 />
        <Container19 />
      </div>
    </div>
  );
}

function Container20() {
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

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0" data-name="Margin">
      <Container20 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] text-center whitespace-nowrap">
        <p className="leading-[16px]">메시지</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="min-h-[56px] relative shrink-0 w-[118px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] py-[6px] relative size-full">
        <Margin2 />
        <Container21 />
      </div>
    </div>
  );
}

function BottomNavBar() {
  return (
    <div className="absolute bg-[#f8f9ff] bottom-0 content-stretch flex h-[80px] items-center justify-center left-0 pt-px px-[16px] w-[390px]" data-name="BottomNavBar">
      <div aria-hidden="true" className="absolute border-[#c3c6d6] border-solid border-t inset-0 pointer-events-none" />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

export default function HtmlBody() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[96px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 255) 0%, rgb(248, 249, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Html → Body">
      <Main />
      <HeaderTopAppBar />
      <BottomNavBar />
    </div>
  );
}