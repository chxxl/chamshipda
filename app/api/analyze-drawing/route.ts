import { generateText, Output } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

export async function POST(req: Request) {
  try {
    const { imageBase64, imageUrl } = await req.json()

    if (!imageBase64 && !imageUrl) {
      return Response.json({ error: "이미지가 필요합니다" }, { status: 400 })
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OpenAI API 키가 설정되지 않았습니다. Settings > Vars에서 OPENAI_API_KEY를 추가해주세요." },
        { status: 500 }
      )
    }

    const imageContent = imageBase64
      ? { type: "image" as const, image: imageBase64 }
      : { type: "image" as const, image: new URL(imageUrl) }

    const result = await generateText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "user",
          content: [
            imageContent,
            {
              type: "text",
              text: `당신은 P&ID(배관 계장 도면) 및 Piping Isometric Drawing 전문가입니다.

이 도면 이미지를 분석하여 모든 기호(심볼)를 찾아주세요.

## 중요: 좌표 시스템
- 이미지를 10x10 그리드로 나눈다고 생각하세요.
- x=0은 이미지의 맨 왼쪽, x=100은 맨 오른쪽입니다.
- y=0은 이미지의 맨 위쪽, y=100은 맨 아래쪽입니다.
- 각 심볼의 **정확한 중심점**을 찾아서 좌표를 제공하세요.
- 예시: 이미지 정중앙에 있는 심볼 = x:50, y:50
- 예시: 왼쪽 상단 = x:10-20, y:10-20
- 예시: 오른쪽 하단 = x:80-90, y:80-90

## 좌표 정확도 가이드
1. 먼저 이미지 전체를 보고 심볼들의 대략적인 배치를 파악하세요.
2. 각 심볼이 이미지에서 가로로 어디에 있는지 (왼쪽/중앙/오른쪽) 판단하세요.
3. 각 심볼이 이미지에서 세로로 어디에 있는지 (위/중앙/아래) 판단하세요.
4. 심볼의 크기(width, height)는 이미지 대비 심볼이 차지하는 비율입니다.
5. 작은 심볼은 보통 width:3-8, height:3-8 정도입니다.
6. 중간 심볼은 보통 width:8-15, height:8-15 정도입니다.

각 심볼에 대해 다음 정보를 제공해주세요:

1. **심볼 이름** (한글 및 영문)
2. **심볼 유형/카테고리** (밸브, 피팅, 계기, 플랜지, 지지대, 연결부 등)
3. **연결 방식** (Butt Weld, Socket Weld, Threaded, Flanged 등)
4. **위치** (도면 내 정확한 위치를 백분율로 - x%, y%)
5. **크기** (도면 대비 심볼 크기를 백분율로 - width%, height%)
6. **상세 설명** (해당 심볼의 기능, 용도, 특징)
7. **인식 근거** (어떤 시각적 특징으로 이 심볼을 판단했는지)
8. **신뢰도** (0-100% 사이, 인식이 확실할수록 높은 값)

## 주요 P&ID 심볼 인식 가이드:

### 밸브 (Valves)
- **Ball Valve (볼 밸브)**: 나비넥타이 모양 (두 삼각형이 꼭짓점에서 만남)
- **Gate Valve (게이트 밸브)**: 두 삼각형 사이에 수평선
- **Globe Valve (글로브 밸브)**: 두 삼각형 사이에 원
- **Check Valve (체크 밸브)**: 삼각형 안에 작은 원, 흐름 방향 표시
- **Butterfly Valve (버터플라이 밸브)**: 나비넥타이에 수직선
- **Needle Valve (니들 밸브)**: 뾰족한 삼각형
- **Plug Valve (플러그 밸브)**: 밸브 안에 사각형/사다리꼴
- **Control Valve (컨트롤 밸브)**: 밸브 위에 액츄에이터 (원 또는 사각형)
- **3-Way Valve (3방향 밸브)**: T자 또는 Y자 형태의 3방향 밸브
- **Relief/Safety Valve (릴리프/안전 밸브)**: 삼각형에서 바깥쪽으로 화살표

### 연결 방식 (End Connections)
- **Flanged (플랜지)**: 끝에 두 개의 평행 수직선 ||
- **Socket Weld (소켓 용접)**: 끝에 작은 사각형 □
- **Butt Weld (맞대기 용접)**: 끝에 채워진 원/점 ●
- **Threaded (나사)**: 끝에 두꺼운 검은 선 ▌

### 피팅 (Fittings)
- **Elbow 90° (90도 엘보)**: 90도 꺾임, L자 형태
- **Elbow 45° (45도 엘보)**: 45도 꺾임
- **Tee Equal (이퀄 티)**: T자 형태, 같은 크기
- **Tee Reducing (레듀싱 티)**: T자 형태, 가지가 더 작음
- **Reducer Concentric (동심 레듀서)**: 원뿔 형태, 중심선 일치
- **Reducer Eccentric (편심 레듀서)**: 원뿔 형태, 한쪽 평평
- **Cap (캡)**: 막힌 끝
- **Union (유니온)**: 두 화살표가 마주보는 형태
- **Cross (크로스)**: +자 형태 (4방향)

### 플랜지 (Flanges)
- **Blind Flange (블라인드 플랜지)**: 막힌 플랜지
- **Weld Neck Flange (웰딩넥 플랜지)**: 용접 목이 있는 플랜지
- **Slip-on Flange (슬립온 플랜지)**: 슬립온 플랜지
- **Spectacle Blind (스펙터클 블라인드)**: 8자 형태
- **Spade/Spacer (스페이드/스페이서)**: 원판 형태

### 스트레이너 (Strainers)
- **Y-Type Strainer (Y형 스트레이너)**: Y자 형태에 빗금 처리
- **Conical Strainer (코니컬 스트레이너)**: 원뿔/깔때기 형태

### 계기/장치 (Instruments)
- **Orifice Plate (오리피스)**: 원 안에 O 또는 RO
- **Flow Meter (유량계)**: 원 안에 FE, FT 등
- **Pressure Gauge (압력계)**: 원 안에 PI, PT 등
- **Temperature Indicator (온도계)**: 원 안에 TI, TT 등

### 지지대 (Supports)
- **Shoe (슈)**: U자 형태
- **Hanger (행거)**: 위에서 내려오는 선
- **Guide (가이드)**: 화살표가 있는 사각형
- **Anchor (앵커)**: 채워진 사각형 또는 X

### 기타 심볼
- **Weld Symbol (용접 심볼)**: 깃발 모양
- **Field Weld (현장 용접)**: 채워진 깃발
- **Slope Up/Down (경사)**: 경사 화살표
- **Direction (방향)**: N/S/E/W 방향 표시
- **Line Number (라인 번호)**: 배관 식별 번호
- **Spool Number (스풀 번호)**: 제작 단위 번호

도면에서 보이는 모든 심볼을 빠짐없이 찾아주세요.

## 최종 점검
- 각 심볼의 좌표가 실제 이미지에서 심볼이 보이는 위치와 일치하는지 확인하세요.
- 심볼이 이미지의 왼쪽에 있으면 x가 0-40 사이여야 합니다.
- 심볼이 이미지의 중앙에 있으면 x가 40-60 사이여야 합니다.
- 심볼이 이미지의 오른쪽에 있으면 x가 60-100 사이여야 합니다.
- 심볼이 이미지의 상단에 있으면 y가 0-40 사이여야 합니다.
- 심볼이 이미지의 중앙에 있으면 y가 40-60 사이여야 합니다.
- 심볼이 이미지의 하단에 있으면 y가 60-100 사이여야 합니다.`,
            },
          ],
        },
      ],
      output: Output.object({
        schema: z.object({
          totalSymbolsFound: z.number().describe("발견된 총 심볼 수"),
          drawingType: z.string().describe("도면 유형 (P&ID, Isometric, Piping Layout 등)"),
          generalDescription: z.string().describe("도면에 대한 전반적인 설명"),
          symbols: z.array(
            z.object({
              id: z.string().describe("고유 ID (symbol_1, symbol_2, ...)"),
              nameKorean: z.string().describe("심볼 이름 (한글)"),
              nameEnglish: z.string().describe("심볼 이름 (영문)"),
              category: z.string().describe("카테고리 (Valves, Fittings, Flanges, Instruments, Supports, Connections 등)"),
              connectionType: z.string().describe("연결 방식 (Butt Weld, Socket Weld, Threaded, Flanged, N/A)"),
              x: z.number().min(0).max(100).describe("X 위치 (%) - 심볼 중심점"),
              y: z.number().min(0).max(100).describe("Y 위치 (%) - 심볼 중심점"),
              width: z.number().min(1).max(50).describe("너비 (%)"),
              height: z.number().min(1).max(50).describe("높이 (%)"),
              description: z.string().describe("상세 설명 (기능, 용도, 특징)"),
              visualFeatures: z.string().describe("인식 근거 (시각적 특징)"),
              confidence: z.number().min(0).max(100).describe("신뢰도 (%)"),
            })
          ),
        }),
      }),
    })

    const analysisResult = result.output

    if (!analysisResult) {
      return Response.json({ error: "분석 결과가 없습니다" }, { status: 500 })
    }

    // Transform to the format expected by the frontend
    const detectedSymbols = analysisResult.symbols.map((symbol) => ({
      symbolId: symbol.id,
      symbolName: `${symbol.nameKorean} (${symbol.nameEnglish})`,
      nameKorean: symbol.nameKorean,
      nameEnglish: symbol.nameEnglish,
      category: symbol.category,
      connectionType: symbol.connectionType,
      x: symbol.x,
      y: symbol.y,
      width: symbol.width,
      height: symbol.height,
      confidence: symbol.confidence,
      description: symbol.description,
      detectedFeatures: symbol.visualFeatures,
    }))

    return Response.json({
      success: true,
      drawingType: analysisResult.drawingType,
      generalDescription: analysisResult.generalDescription,
      totalSymbolsFound: analysisResult.totalSymbolsFound,
      detectedSymbols,
    })
  } catch (error) {
    console.error("Drawing analysis error:", error)
    return Response.json(
      { error: "도면 분석 중 오류가 발생했습니다", details: String(error) },
      { status: 500 }
    )
  }
}
