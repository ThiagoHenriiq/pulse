# Pulse App - Documentação Técnica

## Visão Geral

O Pulse é uma plataforma móvel Android desenvolvida em React Native (Bare Workflow) que centraliza atividades de estudos, criação musical, produtividade, finanças, saúde mental e multimodalidade IA em um único aplicativo. Seu propósito é atuar como uma "extensão cognitiva" do usuário, oferecendo sugestões contextuais, automações e interações fluídas para qualquer tarefa do dia a dia.

Esta documentação técnica descreve a arquitetura, os componentes principais, as tecnologias utilizadas e os pontos de extensão do aplicativo.

---

## Arquitetura

### Visão Geral da Arquitetura

O Pulse segue uma arquitetura modular baseada em componentes, com separação clara de responsabilidades entre as camadas de apresentação, lógica de negócios e acesso a dados. A arquitetura é projetada para ser escalável, manutenível e testável.

### Camadas da Arquitetura

1. **Camada de Apresentação (Frontend)**
   - React Native (Bare Workflow) com TypeScript
   - NativeWind (Tailwind CSS) para estilização
   - React Navigation para roteamento das pilhas de telas
   - Zustand (store global leve) + Context API/Custom Hooks para gerenciamento de estado contextual

2. **Camada de Serviços Nativos**
   - Módulos nativos para funcionalidades de baixa latência
   - Bindings RN via "Native Modules" para expor funções nativas ao JavaScript

3. **Camada de Backend**
   - Firebase (Auth, Firestore, Storage, Functions)
   - Integração com APIs externas (OpenAI, etc.)

---

## Estrutura de Diretórios

```
pulse_app/
├── android/                # Código nativo Android
├── ios/                    # Código nativo iOS
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── common/         # Componentes básicos (Button, Input, etc.)
│   │   ├── copilot/        # Componentes relacionados ao Copilot
│   │   ├── layout/         # Componentes de layout (Header, TabBar, etc.)
│   │   └── [module]/       # Componentes específicos de cada módulo
│   ├── context/            # Contextos React para estado global
│   ├── hooks/              # Hooks personalizados
│   ├── navigation/         # Configuração de navegação
│   ├── screens/            # Telas do aplicativo
│   │   ├── auth/           # Telas de autenticação
│   │   ├── learn/          # Telas do módulo Learn
│   │   ├── studio/         # Telas do módulo Studio
│   │   ├── finance/        # Telas do módulo Finance
│   │   ├── flow/           # Telas do módulo Flow
│   │   ├── health/         # Telas do módulo Health
│   │   └── settings/       # Telas de configurações
│   ├── services/           # Serviços para comunicação com APIs
│   ├── store/              # Stores Zustand para gerenciamento de estado
│   ├── types/              # Definições de tipos TypeScript
│   ├── utils/              # Utilitários e helpers
│   ├── constants/          # Constantes e configurações
│   └── App.tsx             # Componente raiz do aplicativo
├── functions/              # Cloud Functions para Firebase
├── assets/                 # Recursos estáticos (imagens, fontes, etc.)
├── docs/                   # Documentação
└── tests/                  # Testes
```

---

## Tecnologias Utilizadas

### Frontend
- React Native
- TypeScript
- NativeWind
- React Navigation
- Zustand
- AsyncStorage

### Backend
- Firebase Authentication
- Firebase Firestore
- Firebase Storage
- Firebase Functions
- OpenAI API

### Ferramentas de Desenvolvimento
- Jest
- ESLint
- Prettier
- Babel
- Metro

---

## Módulos Principais

### Copilot Global
O núcleo de IA do Pulse, responsável por fornecer sugestões contextuais, automações e interações fluídas em todos os módulos do aplicativo.

**Componentes Principais:**
- Context Manager
- Prompt Engine
- LLM Handler
- Suggestion Renderer
- Feedback Loop

### Pulse Learn
Ferramentas para anotações, cálculos e simulações.
- Cadernos e Notas
- Calculadoras
- Simulador de Circuitos
- Copilot de Estudos

### Pulse Studio
Ferramentas para composição, gravação e mixagem musical.
- Piano Roll
- Mixer
- Gravação de Áudio
- Copilot de Música

### Outros Módulos
- Pulse Finance
- Pulse Flow
- Pulse Health

---

## Integração com IA

### Modelos Utilizados
- GPT-4o
- Whisper
- TTS-1
- Embeddings

### Fluxo de Integração
1. Context Manager coleta informações
2. Prompt Engine gera prompt
3. LLM Handler envia para OpenAI
4. Suggestion Renderer exibe resposta
5. Feedback Loop registra interação

---

## Otimizações de Desempenho

### Modo de Baixo Consumo
- Desativação de animações
- Redução da qualidade de imagens
- Desativação de processamento em segundo plano
- Limitação de requisições de rede
- Desativação de atualização automática
- Redução da frequência de polling
- Desativação de efeitos parallax
- Simplificação da interface

### Outras Otimizações
- Memoização
- Lazy Loading
- Virtualização
- Compressão de Imagens
- Caching

---

## Sistema de Logs e Monitoramento

### Logging de Erros
- Captura de erros não tratados
- Registro de stack trace
- Informações do dispositivo e versão
- Filtragem de dados sensíveis
- Armazenamento local e envio remoto

### Feedback do Usuário
- Captura de screenshots
- Informações do dispositivo
- Sincronização com servidor remoto
- Acompanhamento do status do feedback

---

## Testes

### Tipos de Testes
- Unitários
- Integração
- UI
- Regressão

### Ferramentas
- Jest
- React Native Testing Library
- Mock Service Worker

---

## Pontos de Extensão

### Adição de Novos Módulos
1. Crie uma nova pasta em `src/screens/[module]`
2. Crie componentes em `src/components/[module]`
3. Adicione à navegação em `src/navigation/index.tsx`
4. Implemente integração com o Copilot Global

### Personalização do Copilot
1. Novos templates de prompt em `src/services/copilot/promptTemplates.ts`
2. Novos renderizadores em `src/components/copilot`
3. Novos coletores de contexto em `src/services/copilot/contextCollectors.ts`

### Integração com Novas APIs
1. Configuração em `src/services/api/config.ts`
2. Cliente em `src/services/api/clients`
3. Endpoints em `src/services/api/endpoints`
4. Hooks em `src/hooks/api`

---

## Considerações de Segurança

### Autenticação e Autorização
- Firebase Authentication
- Regras de segurança do Firestore e Storage
- Tokens JWT

### Proteção de Dados
- Criptografia de dados sensíveis
- Filtragem de dados sensíveis em logs
- Armazenamento seguro de tokens

### Conformidade com LGPD
- Consentimento explícito
- Opção para exportar/excluir dados
- Política de privacidade clara

---

## Conclusão

O Pulse é um aplicativo complexo e ambicioso que integra múltiplas funcionalidades e tecnologias para criar uma experiência de usuário única e poderosa. Esta documentação técnica fornece uma visão geral da arquitetura, componentes e tecnologias utilizadas, bem como pontos de extensão para futuras melhorias e personalizações.

Para mais informações sobre cada módulo específico, consulte a documentação detalhada em `docs/modules/`.

---

# Pulse App

## Resumo das Funcionalidades Implementadas

### Visão Geral

O Pulse é uma plataforma móvel Android desenvolvida em React Native que centraliza atividades de estudos, criação musical, produtividade, finanças, saúde mental e multimodalidade IA em um único aplicativo. Seu propósito é atuar como uma "extensão cognitiva" do usuário, oferecendo sugestões contextuais, automações e interações fluídas para qualquer tarefa do dia a dia.

---

### Núcleo Central: Copilot Global

O Copilot Global é o coração do Pulse, uma IA contextual que aprende com o uso e oferece sugestões personalizadas em todos os módulos do aplicativo.

**Funcionalidades Implementadas:**
- Context Manager: Coleta informações em tempo real sobre o contexto do usuário (aba atual, hora, histórico de ações)
- Prompt Engine: Gera prompts otimizados para o LLM com base no contexto coletado
- LLM Handler: Comunica-se com a API da OpenAI para obter respostas relevantes
- Suggestion Renderer: Exibe sugestões da IA em diferentes formatos (ghost text, balão, banner)
- Feedback Loop: Registra aceitação/rejeição de sugestões para melhorar a IA ao longo do tempo

---

### Módulo Pulse Learn (Estudos)

Ferramentas para organização de anotações, cálculos e simulações.

**Funcionalidades Implementadas:**
- Cadernos e Notas: Organização hierárquica, editor Markdown, destaque de sintaxe, sincronização na nuvem
- Calculadoras: Científica, elétrica/eletrônica, histórico de cálculos
- Simulador de Circuitos: Simulação básica, biblioteca de componentes, visualização de corrente/tensão
- Copilot de Estudos: Sugestões contextuais, geração de resumos, criação de questões
- Cronograma e Rotinas: Organização automática de horários, lembretes inteligentes, análise de produtividade

---

### Módulo Pulse Studio (Música)

Ferramentas para composição, gravação e mixagem musical.

**Funcionalidades Implementadas:**
- Piano Roll: Editor MIDI, múltiplas faixas, biblioteca de instrumentos
- Mixer: Controle de volume, pan, equalização, automação
- Efeitos de Áudio: Compressor, delay, reverb, presets
- Gravação de Áudio: Captura do microfone, edição básica, integração com MIDI
- Copilot de Música: Sugestões de acordes, complemento de melodias, assistência para mixagem
- Exportação: Diferentes formatos, compartilhamento, backup na nuvem

---

### Integração com IA

O Pulse utiliza modelos avançados de IA para personalização e inteligência:
- GPT-4o: Geração de texto e compreensão de contexto
- Whisper: Reconhecimento de voz
- TTS-1: Geração de fala
- Embeddings: Busca semântica

---

### Recursos Técnicos

**Funcionalidades Implementadas:**
- Modo de Baixo Consumo: Detecção automática, desativação seletiva de recursos, interface simplificada
- Sistema de Logs e Monitoramento: Registro de erros, análise de desempenho, feedback do usuário
- Sincronização Offline: Funcionamento offline, sincronização automática, resolução de conflitos
- Segurança: Autenticação segura, criptografia, controle de acesso granular

---

### Diferenciais do Pulse

1. Integração Total: Todos os módulos compartilham contexto
2. IA Contextual: Sugestões relevantes em tempo real
3. Personalização: O app aprende com o uso
4. Desempenho: Otimizado para dispositivos limitados
5. Privacidade

---

# Estrutura do Projeto

O Pulse App possui duas partes principais:
- **Mobile (React Native)**: código principal do app, localizado na raiz do projeto.
- **Frontend Web (Next.js)**: localizado em `/frontend`, com build e deploy independentes.

Veja instruções detalhadas de uso e build nos tópicos acima.

---

## 📱 Mobile (React Native)

Siga os passos abaixo para rodar o app mobile:

> **Pré-requisito:** Siga o guia oficial de ambiente do [React Native](https://reactnative.dev/docs/set-up-your-environment).

### 1. Inicie o Metro

```sh
pnpm start
```

### 2. Rode no Android ou iOS

```sh
# Android
pnpm run android

# iOS
bundle install # (primeira vez)
bundle exec pod install # (sempre que atualizar dependências nativas)
pnpm run ios
```

---

## 💻 Frontend Web (Next.js)

O frontend web está em `/frontend` e utiliza Next.js + pnpm.

### Scripts úteis (rodem na raiz do projeto):

```sh
# Rodar em modo desenvolvimento
pnpm run frontend:dev

# Build de produção
dpnm run frontend:build

# Servir build de produção (após build)
pnpm run serve:frontend
```

O comando `serve:frontend` utiliza o arquivo `server.js` na raiz para servir os arquivos estáticos de `/frontend/build`.

---

## Outras informações

- O projeto utiliza `pnpm` como gerenciador de pacotes.
- O backend para servir o frontend é um servidor Express simples (ver `server.js`).
- O mobile e o frontend web são independentes, mas podem compartilhar dependências e lógica se desejado.

---

# Documentação original React Native

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

