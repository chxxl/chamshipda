import svgPaths from "./svg-3gh768l7w0";
import imgAb6AXuBdeTzyXd7K1OshQeSz21XvsBhpnCVu2I1Kt7JYepTqrAr5AFlp28KTlVSabWhMdn0S5H93SLbFvtvwNb9A8FgufpaMnkQveKmOn8S0UhDuA97CJcq4EuD5SfBcQ3DHtHCq0Iy7SpltSdSz9MGpb28Yrzgg0YcMvw7KhoIyp52E8R6DgEwtwNcVfokKl9WP2QsMlFe8COjJiilwla8OizXtqo2BjVyuTrP1MWOmITxnUwPGdVRzYBnes66JxclfYkH78 from "./d2ab1c0b383915601f6acda29a80395aaec14589.png";
import imgAb6AXuDbe03YbzfVtnYSpkNaK5WLd9Y6IeBkxQan8LFoXMbXVScdz762VlCuRjdJikiz7LTw2USChIKagk0QvyuXp1PcToiRnA27HUQvj6XOq0KxfuMeQZy8Ci4CNy1Q0Mwn3Y4P58BQ6OIyxgs9WYq0JBoR4WMigsH2YdfnGpinzKeS17QPvstYf7NHr18ZUzG9BtLav6OS97793N1ZbGz9ISsVhEu8NS84W4RgtwfwpF4MUFxwesSKm62DWbxdbJJkH07DJFzB from "./90c4013b06d5d487b68dd04b042324a56f61ccec.png";
import imgProfile from "./bf38fb8f6badf745f3567c58d630a96397f5a81f.png";

function Button() {
  return (
    <div className="flex-[1_0_0] min-w-px opacity-60 relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[18px] pt-[17px] relative size-full">
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] text-center whitespace-nowrap">
          <p className="leading-[16px]">✅ 승인됨 (12)</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#003d9b] border-b-3 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[19px] pt-[16px] relative size-full">
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003d9b] text-[13px] text-center whitespace-nowrap">
          <p className="leading-[16px]">⏱ 검토 중 (2)</p>
        </div>
      </div>
    </div>
  );
}

function SegmentControl() {
  return (
    <div className="content-stretch flex items-start justify-center pb-px relative shrink-0 w-full" data-name="Segment Control">
      <div aria-hidden="true" className="absolute border-[#c3c6d6] border-b border-solid inset-0 pointer-events-none" />
      <Button />
      <Button1 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#0052cc] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">
        <p className="leading-[16px]">⏱ 검토 중</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[25px]">F-205 플랜지 가스켓 교체</p>
      </div>
      <Background />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[14px] whitespace-nowrap">
        <p className="mb-0">
          <span className="leading-[20px]">박반장</span>
          <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] leading-[20px] not-italic text-[#434654]">이 검토 중입니다</span>
        </p>
        <p className="font-['Liberation_Serif:Bold',sans-serif] leading-[20px] text-[#003d9b]">(약 1 hour 후 결과 알림)</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <div className="relative shrink-0 size-[16.667px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
            <path d={svgPaths.p2f915d80} fill="var(--fill-0, #003D9B)" id="Icon" />
          </svg>
        </div>
        <Container3 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#eff4ff] relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(195,198,214,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start p-[13px] relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Ab6AXuBdeTzyXd7K1OshQeSz21XvsBhpnCVu2I1Kt7JYepTqrAr5AFlp28KTlVSabWhMdn0S5H93SLbFvtvwNb9A8FgufpaMnkQveKmOn8S0UhDuA97CJcq4EuD5SfBcQ3DHtHCq0Iy7SpltSdSz9MGpb28Yrzgg0YcMvw7KhoIyp52E8R6DgEwtwNcVfokKl9WP2QsMlFe8COjJiilwla8OizXtqo2BjVyuTrP1MWOmITxnUwPGdVRzYBnes66JxclfYkH() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="AB6AXuBdeTzyXd7k-1oshQeSZ21XVSBhpnCVu2I1KT7JYepTQRAr5aFlp28-kTlVSabWhMDN0S5h93sLBFvtvwNB9a8-FgufpaMnkQveKm-ON8s0UhDuA97cJcq4euD5sfBc-q3dHtHCq0Iy7SPLTSdSz9M-gpb28yrzgg0Yc_Mvw7KhoIyp52e8R6DgEwtwNcVfokKl9wP2QSMlFe8COjJIILWLA8oizXTQO2BjVyuTrP1mWOmI-TxnUW_pGdV-RzYBnes66jxclfYkH78_">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAb6AXuBdeTzyXd7K1OshQeSz21XvsBhpnCVu2I1Kt7JYepTqrAr5AFlp28KTlVSabWhMdn0S5H93SLbFvtvwNb9A8FgufpaMnkQveKmOn8S0UhDuA97CJcq4EuD5SfBcQ3DHtHCq0Iy7SpltSdSz9MGpb28Yrzgg0YcMvw7KhoIyp52E8R6DgEwtwNcVfokKl9WP2QsMlFe8COjJiilwla8OizXtqo2BjVyuTrP1MWOmITxnUwPGdVRzYBnes66JxclfYkH78} />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#f8f9ff] relative rounded-[8px] shrink-0 size-[64px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Ab6AXuBdeTzyXd7K1OshQeSz21XvsBhpnCVu2I1Kt7JYepTqrAr5AFlp28KTlVSabWhMdn0S5H93SLbFvtvwNb9A8FgufpaMnkQveKmOn8S0UhDuA97CJcq4EuD5SfBcQ3DHtHCq0Iy7SpltSdSz9MGpb28Yrzgg0YcMvw7KhoIyp52E8R6DgEwtwNcVfokKl9WP2QsMlFe8COjJiilwla8OizXtqo2BjVyuTrP1MWOmITxnUwPGdVRzYBnes66JxclfYkH />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Ab6AXuDbe03YbzfVtnYSpkNaK5WLd9Y6IeBkxQan8LFoXMbXVScdz762VlCuRjdJikiz7LTw2USChIKagk0QvyuXp1PcToiRnA27HUQvj6XOq0KxfuMeQZy8Ci4CNy1Q0Mwn3Y4P58BQ6OIyxgs9WYq0JBoR4WMigsH2YdfnGpinzKeS17QPvstYf7NHr18ZUzG9BtLav6OS97793N1ZbGz9ISsVhEu8NS84W4RgtwfwpF4MUFxwesSKm62DWbxdbJJkH07DJFzB() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="AB6AXuDBE03YbzfVtnYSpkNaK5wLD9Y6IeBkxQan8LFoX-mbX-v-scdz762VL_CuRjdJIKIZ7lTW2uSChI_kagk0qvyuXp1PcToiRnA27hUQvj6X_oq0KxfuMe-qZy8ci4cNy1Q0MWN3y4P58bQ6oIYXGS9WYq0JBoR4WMigsH2YdfnGPINZKeS17qPvstYF7NHr18ZUzG9btLav6oS97793n-1zbGZ9iSsVhEU8nS84w4RgtwfwpF4mUFxwesSKm62dWbxdbJJkH07dJFzB">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAb6AXuDbe03YbzfVtnYSpkNaK5WLd9Y6IeBkxQan8LFoXMbXVScdz762VlCuRjdJikiz7LTw2USChIKagk0QvyuXp1PcToiRnA27HUQvj6XOq0KxfuMeQZy8Ci4CNy1Q0Mwn3Y4P58BQ6OIyxgs9WYq0JBoR4WMigsH2YdfnGpinzKeS17QPvstYf7NHr18ZUzG9BtLav6OS97793N1ZbGz9ISsVhEu8NS84W4RgtwfwpF4MUFxwesSKm62DWbxdbJJkH07DJFzB} />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#f8f9ff] relative rounded-[8px] shrink-0 size-[64px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Ab6AXuDbe03YbzfVtnYSpkNaK5WLd9Y6IeBkxQan8LFoXMbXVScdz762VlCuRjdJikiz7LTw2USChIKagk0QvyuXp1PcToiRnA27HUQvj6XOq0KxfuMeQZy8Ci4CNy1Q0Mwn3Y4P58BQ6OIyxgs9WYq0JBoR4WMigsH2YdfnGpinzKeS17QPvstYf7NHr18ZUzG9BtLav6OS97793N1ZbGz9ISsVhEu8NS84W4RgtwfwpF4MUFxwesSKm62DWbxdbJJkH07DJFzB />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 20">
        <g id="Container">
          <path d={svgPaths.p31d16a00} fill="var(--fill-0, #737685)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-[#e6eeff] relative rounded-[8px] shrink-0 size-[64px]" data-name="Background+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Container5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder1 />
      <BackgroundBorder2 />
      <BackgroundBorder3 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Margin">
      <Container4 />
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
        <Container1 />
        <BackgroundBorder />
        <Margin />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white h-[217px] relative rounded-[12px] shrink-0 w-full" data-name="Card 1">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[7px] pr-px py-px relative size-full">
          <Container />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#0052cc] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">
        <p className="leading-[16px]">⏱ 검토 중</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[20px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[25px]">라인 도색 검수</p>
      </div>
      <Background1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <div className="relative shrink-0 size-[16.667px]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
            <path d={svgPaths.p2f915d80} fill="var(--fill-0, #003D9B)" id="Icon" />
          </svg>
        </div>
        <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0d1c2f] text-[14px] whitespace-nowrap">
          <p>
            <span className="leading-[20px]">이품질</span>
            <span className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] leading-[20px] not-italic text-[#434654]">이 검토 중입니다</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-[#eff4ff] relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(195,198,214,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start p-[13px] relative size-full">
        <Paragraph />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start p-[16px] relative size-full">
        <Container7 />
        <BackgroundBorder4 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white h-[117px] relative rounded-[12px] shrink-0 w-full" data-name="Card 2">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[7px] pr-px py-px relative size-full">
          <Container6 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Container">
          <path d={svgPaths.p36688180} fill="var(--fill-0, #737685)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">검토 중인 작업이 더 이상 없습니다</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center opacity-60 py-[48px] relative shrink-0 w-full" data-name="Empty State">
      <Container8 />
      <Container9 />
    </div>
  );
}

function TaskListContent() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Task List Content">
      <Card />
      <Card1 />
      <EmptyState />
    </div>
  );
}

function Main() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[24px] items-start pt-[84px] px-[20px] relative size-full">
        <SegmentControl />
        <TaskListContent />
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="max-w-[40px] relative shrink-0 size-[38px]" data-name="Profile">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-[-2.63%] max-w-none size-[105.26%] top-[-2.63%]" src={imgProfile} />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[40px]" data-name="Border">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Profile />
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#003d9b] text-[26px] tracking-[-0.52px] whitespace-nowrap">
        <p className="leading-[34px]">참ship다</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Border />
        <Heading />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p164b49c0} fill="var(--fill-0, #003D9B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[56px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="absolute bg-[#f8f9ff] content-stretch flex h-[64px] items-center justify-between left-0 pb-px px-[20px] top-0 w-[390px]" data-name="Header - TopAppBar">
      <div aria-hidden="true" className="absolute border-[#c3c6d6] border-b border-solid inset-0 pointer-events-none" />
      <Container10 />
      <Button2 />
    </div>
  );
}

function Container13() {
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

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">할 일</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="min-h-[56px] relative shrink-0 w-[118px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] py-[8px] relative size-full">
        <Container13 />
        <Container14 />
      </div>
    </div>
  );
}

function Container15() {
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

function Container16() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#572000] text-[13px] whitespace-nowrap">
          <p className="leading-[16px]">완료</p>
        </div>
      </div>
    </div>
  );
}

function ActiveTab() {
  return (
    <div className="bg-[#fe6b00] min-h-[56px] relative rounded-[8px] shrink-0 w-[122.02px]" data-name="Active Tab">
      <div aria-hidden="true" className="absolute border-3 border-[#a04100] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] px-[3px] py-[8px] relative size-full">
        <Container15 />
        <Container16 />
      </div>
    </div>
  );
}

function Container18() {
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

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['WenQuanYi_Zen_Hei:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">메시지</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="min-h-[56px] relative shrink-0 w-[118px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center min-h-[inherit] py-[8px] relative size-full">
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function BottomNavBar() {
  return (
    <div className="absolute bg-[#f8f9ff] bottom-0 content-stretch flex h-[80px] items-center justify-center left-0 pt-px px-[16px] w-[390px]" data-name="BottomNavBar">
      <div aria-hidden="true" className="absolute border-[#c3c6d6] border-solid border-t inset-0 pointer-events-none" />
      <Container12 />
      <ActiveTab />
      <Container17 />
    </div>
  );
}

export default function HtmlBody() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[194px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 255) 0%, rgb(248, 249, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Html → Body">
      <Main />
      <HeaderTopAppBar />
      <BottomNavBar />
    </div>
  );
}