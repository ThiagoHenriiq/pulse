import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  if (!prompt) {
    return NextResponse.json({ error: "Prompt obrigatório." }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });
    return NextResponse.json({
      result: response.choices[0].message?.content,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
