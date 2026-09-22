# Item 5 — MÉTODOS

## Parte 1 — Perguntas do roteiro e respostas

**1. O que o roteiro pede neste item?**
O relato de como o produto foi construído, do início à finalização, focando apenas nas ações
construtivas — sem retomar justificativa ou importância do tema. Deve conter a finalidade dos
componentes, os motivos das escolhas técnicas e pelo menos uma ilustração preliminar (fluxograma,
croqui ou mapa mental). Ao final, o leitor deve sentir que conseguiria reproduzir a construção.

**2. Qual foi a sequência de construção do produto?**
Seis etapas encadeadas:
1. Definição do escopo funcional a partir dos objetivos do produto (item 2.2).
2. Definição da arquitetura e separação do repositório em `back-end` e `front-end`.
3. Construção da API (modelo de dados, autenticação, regras de negócio).
4. Construção da interface (navegação, telas, formulários, consumo da API).
5. Integração dos serviços externos: inteligência artificial e armazenamento de arquivos.
6. Verificação: checagem de tipos, análise estática, build de produção e testes das rotas.

**3. Por que o repositório foi dividido em duas pastas?**
Para isolar responsabilidades: `back-end` concentra regras de negócio e persistência; `front-end`
concentra apresentação e interação. A separação permite que cada parte seja executada, testada e
evoluída de forma independente, e deixa explícito que a comunicação entre elas ocorre apenas pela
API HTTP.

**4. Como o back-end foi organizado e por quê?**
Em módulos por domínio (`auth`, `users`, `resumes`, `assessments`, `guides`, `progress`, `ai` e
`attachments`), cada um com quatro camadas de responsabilidade única:

| Camada | Responsabilidade | Motivo da escolha |
| --- | --- | --- |
| `routes` | Declara as rotas HTTP e os middlewares aplicados | Centraliza o mapa de endpoints do módulo |
| `controller` | Traduz requisição e resposta HTTP | Impede que detalhes de HTTP vazem para a regra de negócio |
| `service` | Concentra a regra de negócio | Permite testar a regra sem subir servidor |
| `repository` | Isola as instruções SQL | Permite trocar o banco sem reescrever a regra |

A validação dos dados de entrada ocorre antes do controller, por meio de esquemas Zod aplicados em um
middleware de validação, o que garante que a camada de serviço sempre receba dados já verificados.

**5. Qual banco de dados foi utilizado e por quê?**
PostgreSQL 18, acessado pela biblioteca `pg` e configurado pela variável `DATABASE_URL`. A primeira
versão do protótipo usava SQLite local; a migração foi feita para permitir acesso simultâneo dos
integrantes à mesma base, uso de tipos nativos como `JSONB` e `UUID` e aproximação do ambiente de
produção. O esquema é criado automaticamente na inicialização (migrações idempotentes), em seis
tabelas: `users`, `resumes`, `assessment_attempts`, `guide_reads`, `attachments` e `ai_interactions`.
Como o acesso ao banco está isolado na camada de repositório, a troca exigiu alterar apenas essa
camada, sem impacto nas regras de negócio.

**6. Como foi tratada a segurança das contas?**
As senhas nunca são armazenadas em texto: são derivadas com o algoritmo `scrypt` da biblioteca
nativa de criptografia do Node, com sal aleatório por usuário, e a comparação é feita em tempo
constante. A sessão é mantida por token JWT assinado, exigido pelas rotas protegidas por meio de um
middleware de autenticação.

**7. Como funciona o gerador de currículo e a análise de compatibilidade com ATS?**
O usuário preenche um formulário guiado (dados de contato, objetivo, formação, experiências,
competências e idiomas). O conteúdo é gravado como documento estruturado e, a cada leitura, um
serviço dedicado avalia sete critérios objetivos de triagem automática — contato completo, cargo
declarado, resumo com no mínimo 25 palavras, formação informada, no mínimo cinco palavras-chave
técnicas, idiomas e perfil profissional online. Cada critério atendido soma pontos e o resultado é
convertido em um percentual de compatibilidade, acompanhado da orientação do que precisa ser
corrigido. A exportação em PDF é feita pelo mecanismo de impressão do próprio navegador, com uma
folha de estilos específica que oculta a interface e imprime somente o documento — solução que
dispensa bibliotecas externas de geração de PDF e preserva o texto selecionável, requisito para que
o arquivo seja lido pelos sistemas de triagem.

**8. Como funcionam as simulações comportamentais?**
Três testes (entrevista comportamental, comunicação profissional e trabalho em equipe), com cinco
questões situacionais cada, totalizando quinze questões. Cada alternativa possui uma pontuação
associada; ao enviar as respostas, o servidor calcula o percentual sobre a pontuação máxima possível,
classifica o resultado em faixas de preparo e devolve o diagnóstico com a devolutiva textual. A
tentativa é gravada, o que permite comparar evoluções.

**9. Como o painel de progresso é calculado?**
Um serviço de progresso agrega os dados dos demais módulos e monta uma trilha de cinco etapas: criar
o primeiro currículo, atingir 80% de compatibilidade ATS, concluir uma simulação, concluir todas as
simulações e estudar os guias. O percentual exibido é a razão entre etapas concluídas e etapas
totais, e cada etapa aponta para a tela em que pode ser resolvida.

**10. Como o front-end foi organizado e por quê?**
Adotou-se a regra de que o que é global fica em pastas globais (`components`, `hooks`, `constants`,
`types`, `services`, `lib`) e o que pertence a uma única tela fica dentro da própria página
(`pages/<página>/components`, `hooks`, `schemas`, `lib`). Os componentes de página contêm apenas a
renderização e o consumo do hook da página; estado, chamadas à API, navegação e conversões de dados
ficam nos hooks. O objetivo é manutenibilidade: a origem de qualquer comportamento é previsível e a
alteração de uma tela não afeta as demais.

**11. Como a interface conversa com a API?**
Todo acesso passa pela pasta `services`, que concentra um cliente HTTP único responsável por anexar
o token de autenticação e padronizar os erros. Os serviços são consumidos pelos hooks por meio do
TanStack Query, que gerencia carregamento, cache e revalidação — por exemplo, ao salvar um currículo,
as consultas de currículos e de progresso são invalidadas e o painel reflete o novo estado sem
recarregar a página.

**12. Como os recursos de inteligência artificial foram implementados?**
Em um módulo próprio (`ai`), com o cliente do provedor encapsulado em um único arquivo
(`ai.provider.ts`). São quatro recursos: geração do resumo profissional a partir dos dados do
currículo; análise de aderência entre currículo e descrição de vaga, com nota, palavras-chave
presentes e ausentes e sugestões; geração de carta de apresentação; e devolutiva de resposta de
entrevista pela técnica STAR. Três decisões orientaram a implementação: os comandos enviados ao
modelo proíbem criar experiências não informadas pelo candidato, evitando currículos falsos; as
respostas são exigidas em formato JSON e validadas antes do uso, impedindo que texto livre quebre a
interface; e toda interação é registrada na tabela `ai_interactions`, permitindo auditoria e controle
de consumo.

**13. Como o armazenamento de documentos foi implementado?**
Em um módulo próprio (`attachments`), que valida tipo e tamanho do arquivo — PDF, DOC, DOCX, PNG ou
JPG, até 5 MB — e o envia a um servidor compatível com o protocolo S3. No banco permanecem apenas os
metadados; o conteúdo fica no armazenamento de objetos. O download usa URL assinada com validade de
quinze minutos, de modo que os arquivos não fiquem publicamente acessíveis.

**14. O que acontece se as credenciais externas não estiverem configuradas?**
A aplicação continua funcionando. As rotas de IA e de anexos verificam a configuração e respondem com
o código 503, e as telas correspondentes exibem aviso de indisponibilidade. Currículos, simulações,
guias e painel seguem operantes.

**15. Como o resultado foi verificado?**
Por quatro procedimentos: verificação de tipos com TypeScript nos dois projetos, análise estática com
ESLint, build de produção do front-end e execução das rotas da API com dados reais (cadastro, login,
criação de currículo, envio de simulação, consulta do painel, chamadas de IA e envio de documento).

**16. Qual ilustração deve acompanhar este item?**
Recomenda-se incluir os dois diagramas descritos na Parte 3 deste documento: o fluxograma da
arquitetura (Figura 1) e o fluxo do usuário na plataforma (Figura 2).

---

## Parte 2 — Texto final para o documento

### 5 MÉTODOS

A construção do produto foi organizada em seis etapas encadeadas: definição do escopo funcional,
definição da arquitetura, implementação do servidor de aplicação, implementação da interface,
integração dos serviços externos de inteligência artificial e de armazenamento e verificação do
sistema. Cada etapa é descrita a seguir, acompanhada da justificativa técnica das
escolhas realizadas.

Na primeira etapa, os objetivos do produto foram desdobrados em quatro funcionalidades verificáveis:
geração de currículo com avaliação de compatibilidade com sistemas de triagem automática, biblioteca
de simulações comportamentais, biblioteca de guias de carreira e painel de acompanhamento de
progresso. Essa lista passou a operar como critério de pronto do protótipo.

Na segunda etapa, definiu-se a arquitetura. O repositório foi dividido em duas pastas independentes,
`back-end` e `front-end`, de modo que as regras de negócio e a persistência ficassem isoladas da
apresentação, comunicando-se exclusivamente por meio de uma interface de programação de aplicações
(API) sobre o protocolo HTTP. A separação permite que cada parte seja executada, testada e alterada
sem impacto direto sobre a outra. A organização geral do sistema é apresentada na Figura 1.

Na terceira etapa, implementou-se o servidor de aplicação em Node.js com a biblioteca Express e a
linguagem TypeScript. O código foi dividido em módulos por domínio — autenticação, usuários,
currículos, simulações, guias, progresso, inteligência artificial e documentos — e cada módulo foi
estruturado em quatro camadas de responsabilidade única: rotas, responsáveis por declarar os endereços e os middlewares; controlador,
responsável apenas por traduzir requisição e resposta HTTP; serviço, que concentra a regra de
negócio; e repositório, que isola as instruções de banco de dados. Essa divisão foi adotada para que
a regra de negócio possa ser verificada sem depender do servidor e para que uma eventual troca do
banco de dados não exija reescrita das regras. A validação dos dados recebidos ocorre antes do
controlador, por meio de esquemas declarativos aplicados em um middleware, garantindo que a camada
de serviço receba somente dados já verificados.

Para a persistência, adotou-se o sistema gerenciador de banco de dados PostgreSQL, cujos dados de
conexão são concentrados em uma variável de ambiente. A primeira versão do protótipo utilizava um
banco local em arquivo; a migração foi realizada para permitir o acesso simultâneo dos integrantes a
uma mesma base, o uso de tipos nativos para documentos em formato JSON e identificadores universais e
a aproximação do ambiente ao de uma implantação real. Por estar o acesso a dados isolado na camada de
repositório, a substituição do banco exigiu alteração apenas dessa camada, sem impacto sobre as
regras de negócio. O esquema é criado automaticamente na inicialização, em seis tabelas: usuários,
currículos, tentativas de simulação, registros de leitura de guias, documentos anexados e interações
com a inteligência artificial. Quanto à segurança das contas, as senhas são armazenadas
sob a forma de derivação criptográfica obtida pelo algoritmo scrypt, com sal aleatório por usuário, e
o acesso às rotas restritas é controlado por token assinado no padrão JSON Web Token, verificado por
um middleware de autenticação.

Ainda na terceira etapa, foram implementadas as regras específicas do produto. O gerador de currículo
armazena o documento de forma estruturada e submete seu conteúdo a um serviço de análise que avalia
sete critérios objetivos de triagem automática: presença de dados de contato completos, declaração do
cargo pretendido, resumo profissional com extensão mínima, formação acadêmica informada, quantidade
mínima de palavras-chave técnicas, idiomas informados e presença de perfil profissional em meio
digital. O resultado é convertido em percentual de compatibilidade e acompanhado da orientação
correspondente a cada critério não atendido, de modo que a devolutiva seja acionável pelo candidato.
As simulações comportamentais foram modeladas como conjuntos de questões situacionais com pontuação
associada a cada alternativa; ao receber as respostas, o servidor calcula o percentual sobre a
pontuação máxima, classifica o desempenho em faixas de preparo e registra a tentativa, permitindo o
acompanhamento da evolução. O painel de progresso, por sua vez, não possui dados próprios: ele agrega
as informações dos demais módulos em uma trilha de cinco etapas e calcula o percentual de conclusão a
partir das etapas efetivamente cumpridas.

Na quarta etapa, implementou-se a interface em React com TypeScript, empacotada pela ferramenta Vite
e estilizada com Tailwind CSS. A organização do código seguiu uma regra explícita de escopo: recursos
utilizados por mais de uma tela permanecem em pastas globais, enquanto componentes, hooks e esquemas
específicos de uma tela residem dentro da própria página. Estabeleceu-se, ainda, que os componentes
de página contêm exclusivamente a renderização e o consumo do hook correspondente, ficando o estado,
as chamadas à API, a navegação e as conversões de dados concentrados nos hooks. O objetivo dessa
decisão é a manutenibilidade: a responsabilidade de cada arquivo é previsível e a alteração de uma
tela não produz efeitos colaterais nas demais. Todo acesso à API é feito por uma camada de serviços,
que concentra o cliente HTTP responsável por anexar o token de autenticação e padronizar o tratamento
de erros; os serviços são consumidos pelos hooks por meio da biblioteca TanStack Query, encarregada
do controle de carregamento, do cache e da revalidação dos dados. Assim, ao salvar um currículo, as
consultas de currículos e de progresso são automaticamente invalidadas e o painel passa a refletir o
novo estado. A navegação do usuário entre as telas construídas é apresentada na Figura 2.

Na quinta etapa, integraram-se os dois serviços externos que ampliam as funcionalidades da
plataforma. O primeiro é a interface de programação de um provedor de modelos de linguagem,
responsável por quatro recursos: geração do resumo profissional a partir dos dados já preenchidos no
currículo; análise de aderência entre o currículo e a descrição de uma vaga informada pelo usuário,
com nota, relação de palavras-chave presentes e ausentes e sugestões de ajuste; geração de carta de
apresentação; e devolutiva de resposta de entrevista segundo a técnica STAR, com pontuação, pontos
fortes, pontos a melhorar e reescrita da resposta. Três decisões orientaram essa implementação: os
comandos enviados ao modelo proíbem expressamente a criação de experiências, cursos ou resultados não
informados pelo candidato, de modo que a ferramenta organize o discurso sem produzir informação
falsa; as respostas são exigidas em formato estruturado e validadas antes do uso, impedindo que texto
livre comprometa a interface; e cada interação é registrada em banco, permitindo auditoria e
acompanhamento do consumo. O segundo serviço é um servidor de arquivos compatível com o protocolo S3,
utilizado para o armazenamento de documentos do candidato, como certificados e versões anteriores do
currículo: o servidor de aplicação valida o tipo e o tamanho do arquivo, envia o conteúdo ao
armazenamento de objetos, mantém em banco apenas os metadados e disponibiliza o download por meio de
endereço assinado com validade de quinze minutos, de forma que os arquivos não fiquem publicamente
acessíveis. Ambas as integrações foram construídas de modo que sua ausência não interrompa a
aplicação: quando as credenciais não estão configuradas, as rotas respondem com código de serviço
indisponível e as telas correspondentes exibem aviso ao usuário, permanecendo operantes os demais
módulos.

Na sexta etapa, procedeu-se à verificação do sistema, por meio de quatro procedimentos: verificação
estática de tipos com o compilador TypeScript nos dois projetos, análise estática de código com
ESLint, geração do pacote de produção da interface e execução das rotas da API com dados reais,
cobrindo cadastro, autenticação, criação de currículo, envio de simulação, consulta ao painel de
progresso, chamada aos recursos de inteligência artificial e envio de documentos ao armazenamento de
objetos. Os resultados obtidos nessa verificação são apresentados no item 6.

---

## Parte 3 — Ilustrações a inserir no item 5

### Figura 1 — Arquitetura do sistema (fluxograma)

Desenhar no draw.io, Canva ou PowerPoint a partir do esquema abaixo:

```
┌─────────────────────────────────────────────┐
│                 NAVEGADOR                   │
│  ┌───────────────────────────────────────┐  │
│  │ FRONT-END (React + Vite + TypeScript) │  │
│  │                                       │  │
│  │  Páginas  →  Hooks  →  Serviços       │  │
│  │ (renderiza)  (regra    (acesso HTTP)  │  │
│  │              de tela)                 │  │
│  └───────────────────┬───────────────────┘  │
└──────────────────────┼──────────────────────┘
                       │  HTTP / JSON + token JWT
┌──────────────────────▼──────────────────────┐
│        BACK-END (Node + Express + TS)       │
│                                             │
│   Rotas → Controlador → Serviço → Repositório│
│  (endpoint) (traduz HTTP) (regra)  (SQL)    │
│                                             │
│  Módulos: auth · users · resumes ·          │
│    assessments · guides · progress ·        │
│    ai · attachments                         │
└──────────────────────┬──────────────────────┘
                       │
┌──────────────────────▼──────────────────────┐
│        BANCO DE DADOS (PostgreSQL 18)       │
│  users · resumes · assessment_attempts ·    │
│  guide_reads · attachments · ai_interactions│
└─────────────────────────────────────────────┘

       SERVIÇOS EXTERNOS consumidos pela API
┌──────────────────────┐  ┌───────────────────┐
│  Provedor de IA      │  │  Armazenamento S3 │
│  (resumo, aderência, │  │  (documentos do   │
│   carta, entrevista) │  │   candidato)      │
└──────────────────────┘  └───────────────────┘
```

Legenda sugerida: *Figura 1 — Arquitetura em camadas da plataforma "Primeiro Emprego".
Fonte: elaborado pelos autores (2026).*

### Figura 2 — Fluxo do usuário na plataforma

```
   Cadastro / Login
          │
          ▼
       PAINEL ────────┬──────────┬──────────┬───────────┐
 (trilha de 5 etapas) │          │          │           │
          │           ▼          ▼          ▼           ▼
          ▼      SIMULAÇÕES   TREINO DE   GUIAS    DOCUMENTOS
     CURRÍCULOS  (3 testes,   ENTREVISTA  (3 conteúdos,  (upload S3,
          │      15 questões)  (IA: STAR)  marcar lido)  download
          ▼           │          │          │           assinado)
   Editor de         ▼          ▼          │
   currículo     Resultado   Nota, pontos  │
   ├─ formulário  + devolutiva fortes e    │
   ├─ análise ATS      │      reescrita    │
   ├─ assistente de IA │          │        │
   │  (resumo, vaga,   │          │        │
   │   carta)          │          │        │
   └─ exportar em PDF  │          │        │
          │            │          │        │
          └────────────┴──────────┴────────┴───────────┘
                            ▼
              Progresso atualizado no painel
```

Legenda sugerida: *Figura 2 — Fluxo de uso da plataforma, do cadastro ao acompanhamento do
progresso. Fonte: elaborado pelos autores (2026).*
