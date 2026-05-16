import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, x, y } = (await req.json()) as {
      imageUrl: string;
      x: number;
      y: number;
    };

    if (!imageUrl) {
      return NextResponse.json({ error: "이미지 URL이 필요합니다" }, { status: 400 });
    }

    const imageContent = imageUrl.startsWith("data:image/")
      ? { type: "image" as const, image: imageUrl }
      : { type: "image" as const, image: new URL(imageUrl) };

    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "user",
          content: [
            imageContent,
            {
              type: "text",
              text: `당신은 P&ID(배관 계장 도면) 및 배관 아이소메트릭 도면 전문가입니다.

사용자가 이미지의 왼쪽에서 ${Math.round(x)}%, 위에서 ${Math.round(y)}% 지점을 탭했습니다.

그 위치에 있는 배관 심볼, 부품, 또는 계장 장치를 식별하세요.

반드시 아래 JSON 형식만 응답하세요 (마크다운 없이, 순수 JSON):
{
  "name_ko": "한국어 이름",
  "name_en": "English name",
  "category": "밸브/배관/펌프/계장/피팅/플랜지/열교환기/탱크/기타 중 하나",
  "connection_type": "Butt Weld/Socket Weld/Flanged/Threaded 중 하나 또는 null",
  "description": "이 심볼의 기능과 특징을 한국어로 2-3문장 설명",
  "size_hint": "근처에 표시된 크기·사양(예: DN50, 2인치, PN16) 또는 null"
}

식별 불가능하면: {"error": "해당 위치에서 심볼을 식별할 수 없습니다"}`,
            },
          ],
        },
      ],
    });

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "분석 결과를 파싱할 수 없습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (err) {
    console.error("analyze-symbol error:", err);
    return NextResponse.json(
      { error: "분석 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
