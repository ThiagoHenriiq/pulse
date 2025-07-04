import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY não encontrada no ambiente." }, { status: 500 });
  }
  if (!prompt) {
    return NextResponse.json({ error: "Prompt obrigatório." }, { status: 400 });
  }
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
    if (data.choices && data.choices[0]?.message?.content) {
      return NextResponse.json({ result: data.choices[0].message.content });
    }
    // Log detalhado: status, headers e corpo bruto
    return NextResponse.json({
      error: data.error?.message || "Erro desconhecido",
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: data
    }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
