# PulseApp Functions

Backend serverless (Firebase Functions) para o Pulse App.

## Scripts

- `pnpm build` — Compila TypeScript
- `pnpm serve` — Roda emulador local
- `pnpm deploy` — Faz deploy das funções

## Estrutura

- `src/index.ts` — Funções principais (Copilot, agendamento, finanças, saúde)

## Configuração

- Configure as variáveis de ambiente do OpenAI via `firebase functions:config:set openai.key="SUA_KEY"`
- Use o Firebase CLI para deploy e testes locais

## Dependências

- firebase-functions
- firebase-admin
- openai
- axios
- typescript

## Exemplo de função

Veja `src/index.ts` para exemplos de integração com OpenAI e Firestore.
