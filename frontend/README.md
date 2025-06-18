# Image Analysis

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/thiagohenriiqs-projects/v0-image-analysis)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/6I5W6oc3GeI)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/thiagohenriiqs-projects/v0-image-analysis](https://vercel.com/thiagohenriiqs-projects/v0-image-analysis)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/6I5W6oc3GeI](https://v0.dev/chat/projects/6I5W6oc3GeI)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

# Pulse App Frontend (Next.js)

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

## Rotas API disponíveis

- `POST /api/copilot` — Integração com OpenAI (enviar `{ "prompt": "sua pergunta" }`)
- `POST /api/schedule` — Agendamento (exemplo)
- `POST /api/finance` — Finanças (exemplo)
- `POST /api/health` — Saúde (exemplo)

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do frontend:

```
OPENAI_API_KEY=sua_chave_openai_aqui
```

## Rodando localmente

```bash
cd frontend
pnpm install
pnpm dev
```
Acesse: http://localhost:3000

## Deploy na Vercel

1. Crie uma conta em https://vercel.com/
2. Conecte seu repositório GitHub.
3. Defina a variável de ambiente `OPENAI_API_KEY` no painel da Vercel (Settings > Environment Variables).
4. Deploy automático a cada push!

---

*Documentação gerada por GitHub Copilot*