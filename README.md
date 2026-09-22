# Primeiro Emprego

Plataforma web de preparacao para o primeiro emprego: gerador de curriculo com analise de
compatibilidade ATS, simulacoes comportamentais, guias de carreira e painel de progresso.

## Estrutura

```
back-end/    API em Node + Express + TypeScript + PostgreSQL (IA e armazenamento S3)
front-end/   SPA em React 19 + Vite + TypeScript + Tailwind + TanStack Query
docs/        Documentacao academica do trabalho (itens 4 a 7)
```

## Como rodar

Pre-requisitos: Node 22 ou superior e um servidor PostgreSQL acessivel.

Recursos opcionais: sem `OPENAI_API_KEY` os quatro recursos de IA ficam indisponiveis; sem as
variaveis `S3_*` o envio de documentos fica indisponivel. Em ambos os casos a plataforma continua
funcionando e as telas avisam a indisponibilidade.

### API

```bash
cd back-end
npm install
cp .env.example .env   # preencha DATABASE_URL (o banco precisa existir)
npm run migrate        # cria as tabelas
npm run seed           # opcional: usuario demo@primeiroemprego.dev / demo1234
npm run dev            # http://localhost:3333/api
```

### Front-end

```bash
cd front-end
npm install
cp .env.example .env
npm run dev    # http://localhost:5173
```

## Funcionalidades

| Modulo | Descricao |
| --- | --- |
| Autenticacao | Cadastro e login com JWT; senha protegida com scrypt |
| Curriculos | CRUD de versoes de curriculo, formulario guiado, pre-visualizacao e exportacao em PDF (impressao) |
| Analise ATS | Sete criterios de triagem automatica com nota percentual e orientacao do que corrigir |
| Simulacoes | Tres testes comportamentais com pontuacao, diagnostico e historico de tentativas |
| Guias | Conteudos de curriculo, entrevista e soft skills, com marcacao de leitura |
| Painel | Trilha de etapas, percentual de conclusao e metricas consolidadas |
| Assistente de IA | Gera resumo profissional, analisa aderencia a uma vaga e escreve carta de apresentacao |
| Treino de entrevista | Devolutiva de resposta aberta pela tecnica STAR, com nota e reescrita |
| Documentos | Upload, download por URL assinada e exclusao de anexos em armazenamento S3 |

## API

| Metodo | Rota | Autenticada | Descricao |
| --- | --- | --- | --- |
| POST | `/api/auth/sign-up` | nao | Cria conta e retorna sessao |
| POST | `/api/auth/sign-in` | nao | Autentica e retorna sessao |
| GET | `/api/users/me` | sim | Perfil do usuario logado |
| GET | `/api/resumes` | sim | Lista curriculos com analise ATS |
| POST | `/api/resumes` | sim | Cria curriculo |
| GET | `/api/resumes/:id` | sim | Detalha curriculo |
| PUT | `/api/resumes/:id` | sim | Atualiza curriculo |
| DELETE | `/api/resumes/:id` | sim | Remove curriculo |
| GET | `/api/assessments` | nao | Catalogo de testes |
| GET | `/api/assessments/:slug` | nao | Questoes do teste |
| POST | `/api/assessments/:slug/attempts` | sim | Envia respostas e recebe o resultado |
| GET | `/api/assessments/:slug/attempts` | sim | Historico de tentativas |
| GET | `/api/guides` | opcional | Lista guias (marca os lidos quando autenticado) |
| GET | `/api/guides/:slug` | nao | Conteudo do guia |
| POST | `/api/guides/:slug/read` | sim | Marca guia como lido |
| GET | `/api/progress` | sim | Painel de progresso consolidado |
| GET | `/api/ai/status` | nao | Informa se a IA esta configurada |
| POST | `/api/ai/resume-summary` | sim | Gera o resumo profissional do curriculo |
| POST | `/api/ai/job-match` | sim | Analisa a aderencia entre curriculo e vaga |
| POST | `/api/ai/cover-letter` | sim | Gera carta de apresentacao |
| POST | `/api/ai/interview-feedback` | sim | Avalia resposta de entrevista pela tecnica STAR |
| GET | `/api/ai/history` | sim | Ultimas interacoes de IA do usuario |
| GET | `/api/attachments/status` | nao | Informa se o armazenamento esta configurado |
| GET | `/api/attachments` | sim | Lista documentos com URL de download assinada |
| POST | `/api/attachments` | sim | Envia documento (multipart, ate 5 MB) |
| DELETE | `/api/attachments/:id` | sim | Remove documento do armazenamento e do banco |

## Convencoes de arquitetura

### Front-end

- `src/components`, `src/hooks`, `src/constants`, `src/types` guardam apenas o que e **global**.
  O que pertence a uma pagina fica dentro da propria pagina (`src/pages/<pagina>/components`,
  `hooks`, `schemas`, `lib`).
- Componentes de pagina contem apenas renderizacao e o consumo do hook da pagina. Regras de
  negocio, chamadas de API, estado e handlers ficam nos hooks.
- Todo acesso a API passa por `src/services`, consumido via TanStack Query nos hooks.
- Hooks sao pequenos e com responsabilidade unica; conversoes de dado ficam em `lib`.

### Back-end

- Um modulo por dominio em `src/modules/<dominio>`, com camadas separadas:
  `routes` -> `controller` -> `service` -> `repository`.
- Integracoes externas ficam isoladas em um `provider` por modulo (`ai.provider.ts`,
  `storage.provider.ts`): trocar de provedor de IA ou de armazenamento altera apenas esse arquivo.
- `controller` so traduz HTTP; `service` concentra a regra de negocio; `repository` isola o SQL.
- Validacao de entrada por schema Zod no middleware `validateRequest`.
- Codigo compartilhado (erros, middlewares, utilitarios) em `src/shared`.

## Deploy no Kubernetes

Aplicacao publicada no cluster microk8s (`76.13.168.104`), namespace `primeiro-emprego`, no host
`emprego.vitorsouzadasilva.tech` — `/` serve o front e `/api` vai para a API, o que dispensa CORS.
Manifests em `k8s/`.

Para publicar uma nova versao:

```powershell
.\scripts\deploy.ps1 -Version 1.1.0
```

O procedimento completo — primeiro deploy, rollback, troca de segredos, migracoes, mudanca de
dominio, escala e solucao de problemas — esta em [DEPLOY.md](DEPLOY.md).


## Equipe

- Gabriel Inacio da Silva
- Guilherme de Andrade Campos
- Vitor Souza da Silva

Orientadora: Andressa Barbosa Esteves
