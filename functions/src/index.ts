import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import OpenAI from "openai";

admin.initializeApp();

const openai = new OpenAI({
  apiKey: functions.config().openai?.key || process.env.OPENAI_API_KEY,
});

// Função Copilot: Geração de resposta via OpenAI
export const copilotPrompt = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Usuário não autenticado."
      );
    }
    const prompt = data.prompt;
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{role: "user", content: prompt}],
    });
    return {result: response.choices[0].message?.content};
  }
);

// Função de agendamento (exemplo)
export const scheduleTask = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => {
    // Lógica de agendamento, ex: reorganizar cronogramas de estudo
    return null;
  });

// Função de finanças (exemplo)
export const processFinance = functions.https.onCall(
  async () => {
    // Processamento de transações financeiras, OCR, etc
    return {status: "ok"};
  }
);

// Função de saúde (exemplo)
export const processHealth = functions.https.onCall(
  async () => {
    // Integração com Google Fit, análise de saúde
    return {status: "ok"};
  }
);
