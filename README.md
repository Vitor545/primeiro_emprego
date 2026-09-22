# Primeiro Emprego

Plataforma web de preparacao para o primeiro emprego: gerador de curriculo com analise de
compatibilidade ATS, simulacoes comportamentais, guias de carreira e painel de progresso.

## Estrutura

```
back-end/    API em Node + Express + TypeScript (SQLite nativo do Node)
front-end/   SPA em React 19 + Vite + TypeScript + Tailwind + TanStack Query
```

## Como rodar

Pre-requisito: Node 22 ou superior (a API usa o modulo nativo `node:sqlite`).

### API

```bash
cd back-end
npm install
cp .env.example .env
npm run seed   # opcional: cria o usuario demo@primeiroemprego.dev / demo1234
npm run dev    # http://localhost:3333/api
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
- `controller` so traduz HTTP; `service` concentra a regra de negocio; `repository` isola o SQL.
- Validacao de entrada por schema Zod no middleware `validateRequest`.
- Codigo compartilhado (erros, middlewares, utilitarios) em `src/shared`.

## Equipe

- Gabriel Inacio da Silva
- Guilherme de Andrade Campos
- Vitor Souza da Silva

Orientadora: Andressa Barbosa Esteves
