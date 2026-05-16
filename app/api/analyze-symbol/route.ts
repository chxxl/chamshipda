import { generateText, Output } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { findSymbolDescription, symbolDescriptions } from "@/lib/symbol-descriptions"

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json()

    if (!imageBase64) {
      return Response.json({ error: "이미지가 필요합니다" }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OpenAI API 키가 설정되지 않았습니다." },
        { status: 500 }
      )
    }

    // 심볼 목록을 프롬프트에 포함
    const symbolList = symbolDescriptions.map(s => 
      `- ${s.nameEn} (${s.nameKo}): ${s.description}`
    ).join('\n')

    const result = await generateText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "user",
          content: [
            { type: "image", image: imageBase64 },
            {
              type: "text",
              text: `이 이미지는 P&ID 또는 Piping Isometric 도면의 일부입니다.
이미지에 보이는 심볼(기호)이 무엇인지 분석해주세요.

## 인식 가능한 심볼 목록 (반드시 이 중에서 매칭):
${symbolList}

## 심볼 인식 가이드:

### 밸브 (Valves) - 시각적 특징
- Ball Valve: 나비넥타이 모양 (두 삼각형이 꼭짓점에서 만남)
- Gate Valve: 두 삼각형 사이에 수평선
- Globe Valve: 두 삼각형 사이에 원
- Check Valve: 삼각형 안에 작은 원
- Butterfly Valve: 나비넥타이에 수직선
- Needle Valve: 뾰족한 삼각형
- Plug Valve: 밸브 안에 사각형
- Control Valve: 밸브 위에 액츄에이터
- Three-way Valve: T자 또는 Y자 형태의 밸브
- Relief Valve: 삼각형에서 바깥쪽으로 화살표
- Y-type Valve: 사선으로 된 Y형 밸브 바디

### 연결 방식 (끝부분 확인)
- Flanged: 끝에 두 개의 평행 수직선 ||
- Socket Weld: 끝에 작은 사각형 □
- Butt Weld: 끝에 채워진 원/점 ●
- Threaded: 끝에 두꺼운 검은 선 ▌

### 피팅 (Fittings)
- Elbow 90°: 90도 꺾임, L자 형태
- Elbow 45°: 45도 꺾임
- Tee Equal: T자 형태 (같은 크기)
- Tee Reducing: T자 형태 (분기가 작음)
- Reducer Concentric: 중심이 같은 원뿔 형태
- Reducer Eccentric: 한쪽이 평평한 원뿔 형태
- Cap: 막힌 끝

### 플랜지 (Flanges)
- Welding Neck: 목이 있는 플랜지
- Slip-on: 끼워서 용접하는 플랜지
- Blind: 막힌 플랜지

### 기타 (Miscellaneous)
- Restriction Orifice: 원 안에 RO
- Y-type Strainer: Y자에 빗금
- Conical Strainer: 원뿔에 빗금
- Spectacle Blind: 8자/안경 형태
- Spade: 원판 형태
- Spacer: 사각형 점선
- Field Weld: 깃발 모양
- Orifice Assembly: 오리피스 플레이트

위 목록의 심볼 이름(영문) 중에서 가장 일치하는 것을 찾아주세요.`,
            },
          ],
        },
      ],
      output: Output.object({
        schema: z.object({
          symbolFound: z.boolean().describe("심볼이 발견되었는지 여부"),
          matchedSymbolId: z.string().describe("매칭된 심볼 ID (예: gate_valve, elbow_90)"),
          nameKorean: z.string().describe("심볼 이름 (한글)"),
          nameEnglish: z.string().describe("심볼 이름 (영문)"),
          category: z.string().describe("카테고리"),
          connectionType: z.string().describe("연결 방식 (Butt Weld, Socket Weld, Threaded, Flanged, N/A)"),
          visualFeatures: z.string().describe("인식 근거 - 어떤 시각적 특징으로 판단했는지"),
          confidence: z.number().min(0).max(100).describe("신뢰도"),
        }),
      }),
    })

    // GPT 응답에서 심볼 정보 추출
    const gptResult = result.output

    // 데이터베이스에서 매칭되는 설명 찾기
    const matchedDescription = findSymbolDescription(gptResult?.nameEnglish || '')

    // 최종 응답 구성
    const response = {
      success: true,
      symbolFound: gptResult?.symbolFound ?? false,
      nameKorean: matchedDescription?.nameKo || gptResult?.nameKorean || "알 수 없음",
      nameEnglish: matchedDescription?.nameEn || gptResult?.nameEnglish || "Unknown",
      category: matchedDescription?.category || gptResult?.category || "기타",
      connectionType: gptResult?.connectionType || "N/A",
      // 데이터베이스 설명 우선 사용
      description: matchedDescription?.description || "설명이 데이터베이스에 등록되지 않았습니다.",
      confidence: gptResult?.confidence ?? 0,
      // 데이터베이스 매칭 여부
      isMatchedFromDatabase: !!matchedDescription,
      // 실제 제품 이미지 URL
      imageUrl: matchedDescription?.imageUrl || null,
    }

    return Response.json(response)
  } catch (error) {
    console.error("Symbol analysis error:", error)
    return Response.json(
      { error: "심볼 분석 중 오류가 발생했습니다", details: String(error) },
      { status: 500 }
    )
  }
}
