import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "OPENAI_API_KEY não encontrada" }, { status: 404 });
  }
  // Retorna só os 6 primeiros e 4 últimos caracteres para segurança
  return NextResponse.json({
    OPENAI_API_KEY: key.length > 10 ? `${key.slice(0, 6)}...${key.slice(-4)}` : key
  });
}
