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

function SubSegmentTabApprovedInactive() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[18px] pt-[17px] relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] text-center whitespace-nowrap">
          <p className="leading-[16px]">✅ 승인됨 (12)</p>
        </div>
      </div>
    </div>
  );
}

function SubSegmentTabReviewingInactive() {
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

function SubSegmentTabReworkActive() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#a04100] border-b-3 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[19px] pt-[16px] relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a04100] text-[13px] text-center whitespace-nowrap">
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
      <SubSegmentTabApprovedInactive />
      <SubSegmentTabReviewingInactive />
      <SubSegmentTabReworkActive />
    </div>
  );
}

function ReworkStatusPill() {
  return (
    <div className="relative shrink-0 rounded-[9999px] bg-[#fff3e0] px-[12px] py-[4px]" data-name="Background">
      <p className="font-['Pretendard:Bold',sans-serif] text-[13px] leading-[16px] text-[#a04100]">재작업</p>
    </div>
  );
}

function ReworkMockCard1() {
  return (
    <div className="relative w-full shrink-0 rounded-[12px] bg-white" data-name="Rework Card 1">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[12px] border border-solid border-[#c3c6d6]" />
      <div className="content-stretch flex flex-col gap-[12px] p-[17px]">
        <div className="content-stretch flex w-full items-start justify-between gap-2">
          <p className="font-['Pretendard:Semi_Bold',sans-serif] text-[20px] leading-[28px] tracking-[-0.2px] text-[#0d1c2f]">
            V-203 게이트밸브 토크 재설정
          </p>
          <ReworkStatusPill />
        </div>
        <p className="font-['Pretendard:Regular',sans-serif] text-[14px] leading-[21px] text-[#434654]">
          사유: 체결 토크 42 N·m로 기록됐으나 Rev.C 도면은 38±2 N·m. 어제 검수에서 반려되었습니다.
        </p>
        <div className="content-stretch flex flex-wrap gap-2">
          <span className="rounded bg-[#e6eeff] px-2 py-1 font-['Pretendard:Regular',sans-serif] text-[11px] text-[#434654]">
            요청일 2026. 5. 14.
          </span>
          <span className="rounded bg-[#e6eeff] px-2 py-1 font-['Pretendard:Regular',sans-serif] text-[11px] text-[#434654]">
            요청 박반장
          </span>
        </div>
        <div className="content-stretch flex gap-3 rounded-[8px] bg-[#eff4ff] p-3">
          <div className="relative size-12 shrink-0 overflow-hidden rounded border border-solid border-[#c3c6d6]">
            <img alt="" className="size-full object-cover" src={imgWorkPhoto} />
          </div>
          <p className="font-['Pretendard:Italic',sans-serif] text-[14px] leading-[20px] text-[#434654]">
            &quot;토크렌치 디스플레이 클로즈업 사진으로 다시 올려 주세요.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}

function ReworkMockCard2() {
  return (
    <div className="relative w-full shrink-0 rounded-[12px] bg-white" data-name="Rework Card 2">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[12px] border border-solid border-[#c3c6d6]" />
      <div className="content-stretch flex flex-col gap-[12px] p-[17px]">
        <div className="content-stretch flex w-full items-start justify-between gap-2">
          <p className="font-['Pretendard:Semi_Bold',sans-serif] text-[20px] leading-[28px] tracking-[-0.2px] text-[#0d1c2f]">
            F-205 플랜지 면 삽편 재가공
          </p>
          <ReworkStatusPill />
        </div>
        <p className="font-['Pretendard:Regular',sans-serif] text-[14px] leading-[21px] text-[#434654]">
          사유: 0.05 mm 이내 요구인데 현장 측정 0.08 mm. 용접비드 쪽만 튀어나온 상태로 제출됨.
        </p>
        <div className="relative h-[88px] w-full overflow-hidden rounded-[8px] border border-solid border-[#c3c6d6]">
          <img alt="" className="absolute left-0 top-[-8%] h-[116%] w-full max-w-none object-cover" src={imgPaintDetail1} />
        </div>
        <div className="content-stretch flex flex-wrap gap-2">
          <span className="rounded bg-[#e6eeff] px-2 py-1 font-['Pretendard:Regular',sans-serif] text-[11px] text-[#434654]">
            마감 5/18 16:00
          </span>
          <span className="rounded bg-[#e6eeff] px-2 py-1 font-['Pretendard:Regular',sans-serif] text-[11px] text-[#434654]">
            이품질 검토
          </span>
        </div>
      </div>
    </div>
  );
}

function ReworkMockCard3() {
  return (
    <div className="relative w-full shrink-0 rounded-[12px] bg-white" data-name="Rework Card 3">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[12px] border border-solid border-[#c3c6d6]" />
      <div className="content-stretch flex flex-col gap-[12px] p-[17px]">
        <div className="content-stretch flex w-full items-start justify-between gap-2">
          <p className="font-['Pretendard:Semi_Bold',sans-serif] text-[20px] leading-[28px] tracking-[-0.2px] text-[#0d1c2f]">
            C-12 지지대 용접 비드 재촬영
          </p>
          <ReworkStatusPill />
        </div>
        <p className="font-['Pretendard:Regular',sans-serif] text-[14px] leading-[21px] text-[#434654]">
          사유: 조명 역광으로 비드 윤곽이 안 보입니다. 보조등 켠 상태로 정면·45° 각 1장씩.
        </p>
        <div className="relative h-[88px] w-full overflow-hidden rounded-[8px] border border-solid border-[#c3c6d6]">
          <img alt="" className="absolute left-0 top-[-8%] h-[116%] w-full max-w-none object-cover" src={imgPaintDetail2} />
        </div>
        <p className="font-['Pretendard:Medium',sans-serif] text-[13px] leading-[18px] text-[#003d9b]">
          메모: 동일 구역 3번째 재작업 건 — 이번 제출 후 최종 판정 예정.
        </p>
      </div>
    </div>
  );
}

function TaskListSection() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start py-[8px] relative shrink-0 w-full" data-name="Task List Section">
      <ReworkMockCard1 />
      <ReworkMockCard2 />
      <ReworkMockCard3 />
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