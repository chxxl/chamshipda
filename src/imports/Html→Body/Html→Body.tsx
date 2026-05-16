import svgPaths from "./svg-oa8c5o6lz8";

function BackgroundDecorationOptionalIndustrialTexture() {
  return (
    <div className="absolute inset-[0_0_0.32px_0] opacity-5 overflow-clip" data-name="Background Decoration (Optional Industrial Texture)">
      <div className="absolute border-40 border-[#003d9b] border-solid opacity-10 right-[-96px] rounded-[9999px] size-[384px] top-[-96px]" data-name="Border" />
      <div className="absolute bg-[#fe6b00] bottom-[-96px] left-[-96px] opacity-10 rounded-[9999px] size-[256px]" data-name="Background" />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0052cc] text-[36px] tracking-[-1.8px] whitespace-nowrap">
        <p className="leading-[54px]">참ship다</p>
      </div>
      <div className="absolute bg-[#fe6b00] bottom-[-4px] h-[3px] left-0 right-0" data-name="Background" />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.31px] pb-[16px] relative shrink-0 z-[2]" data-name="Margin">
      <Container />
    </div>
  );
}

function HeaderLogoTaglineBlock() {
  return (
    <div className="content-stretch flex flex-col isolate items-center relative shrink-0 w-full" data-name="Header - Logo & Tagline Block">
      <Margin />
      <div className="flex flex-col font-['Pretendard:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[15px] text-center whitespace-nowrap z-[1]">
        <p className="leading-[24.38px]">복잡한 도면도, 참ship다로 보면 참 쉽다</p>
      </div>
    </div>
  );
}

function HeaderLogoTaglineBlockMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-name="Header - Logo & Tagline Block:margin">
      <HeaderLogoTaglineBlock />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#0052cc] flex-[1_0_0] h-full min-w-px relative rounded-[10px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-white whitespace-nowrap">
          <p className="leading-[26px]">작업자</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative rounded-[10px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[17px] text-center whitespace-nowrap">
          <p className="leading-[26px]">관리자</p>
        </div>
      </div>
    </div>
  );
}

function RoleSelectorSegmentedControl() {
  return (
    <div className="bg-[#dde9ff] h-[64px] relative rounded-[12px] shrink-0 w-full" data-name="Role Selector (Segmented Control)">
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[5px] relative size-full">
          <Button />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#737685] text-[16px] w-full">
          <p className="leading-[normal]">사번 또는 아이디</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[64px] relative rounded-[12px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[57px] pr-[21px] py-[22.5px] relative size-full">
          <Container1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p85bff00} fill="var(--fill-0, #434654)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-[20px] top-0" data-name="Container">
      <Container3 />
    </div>
  );
}

function IdInput() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="ID Input">
      <Input />
      <Container2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#737685] text-[16px] w-full">
          <p className="leading-[normal]">비밀번호</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[64px] relative rounded-[12px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[57px] py-[22.5px] relative size-full">
          <Container4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#c3c6d6] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 21">
        <g id="Container">
          <path d={svgPaths.p12930f00} fill="var(--fill-0, #434654)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bottom-0 content-stretch flex items-center left-[20px] top-0" data-name="Container">
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[15px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 15">
        <g id="Container">
          <path d={svgPaths.p3e801e80} fill="var(--fill-0, #434654)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bottom-[4.5px] content-stretch flex items-center py-[20px] right-[20px] top-[4.5px]" data-name="Button">
      <Container7 />
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Password Input">
      <Input1 />
      <Container5 />
      <Button2 />
    </div>
  );
}

function InputFields() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Input Fields">
      <IdInput />
      <PasswordInput />
    </div>
  );
}

function InputFieldsMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-name="Input Fields:margin">
      <InputFields />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#0052cc] content-stretch flex h-[64px] items-center justify-center relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] h-[64px] left-0 right-0 rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0" data-name="Button:shadow" />
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white whitespace-nowrap">
        <p className="leading-[30px]">로그인</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#737685] text-[13px] tracking-[1.3px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">또는</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[16px] items-center py-[8px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#c3c6d6] flex-[1_0_0] h-px min-w-px relative" data-name="Horizontal Divider" />
      <Container9 />
      <div className="bg-[#c3c6d6] flex-[1_0_0] h-px min-w-px relative" data-name="Horizontal Divider" />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[15px] relative shrink-0 w-[16.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 15">
        <g id="Container">
          <path d={svgPaths.pd822a80} fill="var(--fill-0, #0052CC)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[56px] items-center justify-center p-px relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#0052cc] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container10 />
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0052cc] text-[17px] text-center whitespace-nowrap">
        <p className="leading-[26px]">회사 SSO로 로그인</p>
      </div>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start pt-[16px] relative shrink-0 w-full" data-name="Action Buttons">
      <Button3 />
      <Container8 />
      <Button4 />
    </div>
  );
}

function ActionButtonsMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-name="Action Buttons:margin">
      <ActionButtons />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#737685] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Pretendard:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#737685] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">로그인 정보를 잊으셨나요?</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[29px] items-start justify-center pt-[8px] relative shrink-0 w-full" data-name="Container">
      <Link />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-name="Margin">
      <Container11 />
    </div>
  );
}

function MainFormContent() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[476.32px] pt-[476.31px] relative shrink-0 w-full" data-name="Main Form Content">
      <RoleSelectorSegmentedControl />
      <InputFieldsMargin />
      <ActionButtonsMargin />
      <Margin1 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">v1.0.0</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Pretendard:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#434654] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">고객지원 1588-XXXX</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[12px] items-center opacity-70 relative shrink-0" data-name="Container">
      <Container13 />
      <div className="bg-[#c3c6d6] h-[12px] relative shrink-0 w-px" data-name="Vertical Divider" />
      <Container14 />
    </div>
  );
}

function SafetyBannerDecorativeElement() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Safety Banner Decorative Element">
      <div className="bg-[#fe6b00] h-[8px] relative shrink-0 w-[32px]" data-name="Background" />
      <div className="bg-[#434654] h-[8px] relative shrink-0 w-[32px]" data-name="Background" />
      <div className="bg-[#fe6b00] h-[8px] relative shrink-0 w-[32px]" data-name="Background" />
      <div className="bg-[#434654] h-[8px] relative shrink-0 w-[32px]" data-name="Background" />
      <div className="bg-[#fe6b00] h-[8px] relative shrink-0 w-[32px]" data-name="Background" />
    </div>
  );
}

function SafetyBannerDecorativeElementMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0" data-name="Safety Banner Decorative Element:margin">
      <SafetyBannerDecorativeElement />
    </div>
  );
}

function Footer() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full" data-name="Footer">
      <Container12 />
      <SafetyBannerDecorativeElementMargin />
    </div>
  );
}

function FooterMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Footer:margin">
      <Footer />
    </div>
  );
}

export default function HtmlBody() {
  return (
    <div className="content-stretch flex flex-col items-center justify-between px-[20px] py-[48px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(248, 249, 255) 0%, rgb(248, 249, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Html → Body">
      <BackgroundDecorationOptionalIndustrialTexture />
      <HeaderLogoTaglineBlockMargin />
      <MainFormContent />
      <FooterMargin />
    </div>
  );
}