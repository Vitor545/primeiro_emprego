# Item 4 — MATERIAIS

## Parte 1 — Perguntas do roteiro e respostas

**1. O que o roteiro pede neste item?**
Um parágrafo introdutório curto, em linguagem formal e terceira pessoa, seguido de uma tabela com os
recursos necessários **apenas** para o produto que a equipe efetivamente desenvolveu e vai apresentar.

**2. O que conta como recurso?**
Tudo o que foi usado na construção: equipamentos, softwares, bibliotecas, serviços e mão de obra
especializada. Como o produto é uma plataforma web, não há matéria-prima física.

**3. Quais equipamentos foram utilizados?**
Três notebooks pessoais dos integrantes (um por desenvolvedor) e conexão de internet banda larga.
As configurações exatas devem ser preenchidas pela equipe na tabela — estão marcadas como
`[confirmar]`.

**4. Quais softwares e ferramentas foram utilizados, e qual o custo de cada um?**
Com exceção da interface de programação da OpenAI, cobrada por uso, todos os recursos empregados são
gratuitos ou de código aberto, o que zera o custo de licenças:

| Ferramenta | Função no projeto | Custo |
| --- | --- | --- |
| Node.js 24 | Ambiente de execução do back-end | Gratuito (open source) |
| TypeScript | Linguagem usada no front e no back | Gratuito (open source) |
| Vite | Servidor de desenvolvimento e empacotador do front-end | Gratuito (open source) |
| React 19 | Biblioteca de construção da interface | Gratuito (open source) |
| Tailwind CSS 4 + shadcn/Base UI | Estilização e componentes de interface | Gratuito (open source) |
| TanStack Query | Comunicação com a API e cache de dados | Gratuito (open source) |
| React Router | Navegação entre páginas | Gratuito (open source) |
| React Hook Form + Zod | Formulários e validação de dados | Gratuito (open source) |
| Express 5 | Servidor HTTP da API | Gratuito (open source) |
| PostgreSQL 18 | Banco de dados da aplicação (servidor remoto) | Gratuito (open source) |
| API da OpenAI (modelo `gpt-4o-mini`) | Recursos de inteligência artificial da plataforma | Pago por uso: US$ 0,15 por 1M de tokens de entrada e US$ 0,60 por 1M de saída |
| SeaweedFS (API S3) | Armazenamento dos documentos enviados pelo candidato | Gratuito (open source) |
| jsonwebtoken + scrypt (Node) | Autenticação e proteção de senhas | Gratuito (open source/nativo) |
| Visual Studio Code | Editor de código | Gratuito |
| Git e GitHub | Versionamento e repositório do código | Gratuito (plano free) |
| Navegador Chrome/Edge | Testes da interface e exportação do currículo em PDF | Gratuito |

**5. Qual modelo de inteligência artificial foi utilizado e quanto custa?**
O modelo `gpt-4o-mini`, da OpenAI, definido na variável `OPENAI_MODEL`. Ele foi escolhido por ser o
modelo de menor custo da família com qualidade suficiente para as quatro tarefas da plataforma
(redação do resumo profissional, análise de aderência à vaga, carta de apresentação e devolutiva de
entrevista), todas de texto curto e estruturado.

A cobrança é por token processado, não por requisição:

| Item | Preço (USD por 1 milhão de tokens) |
| --- | --- |
| Entrada (prompt enviado) | US$ 0,15 |
| Entrada em cache | US$ 0,075 |
| Saída (resposta gerada) | US$ 0,60 |

Estimativa por chamada, a partir dos tamanhos reais definidos no código (instruções de 150 a 230
tokens, currículo de cerca de 350 tokens, descrição de vaga limitada a 8.000 caracteres e resposta
limitada a 900 tokens), considerando a proporção usual de 1 token para cada 4 caracteres:

| Recurso | Entrada estimada | Saída estimada | Custo por chamada |
| --- | --- | --- | --- |
| Resumo profissional | ~550 tokens | ~250 tokens | US$ 0,00023 (R$ 0,0012) |
| Aderência à vaga | ~1.500 tokens | ~350 tokens | US$ 0,00044 (R$ 0,0022) |
| Carta de apresentação | ~1.300 tokens | ~350 tokens | US$ 0,00040 (R$ 0,0021) |
| Devolutiva de entrevista | ~1.250 tokens | ~300 tokens | US$ 0,00037 (R$ 0,0019) |

Em outras palavras, mil chamadas de qualquer um dos recursos custam entre R$ 1,20 e R$ 2,20. Durante
o desenvolvimento e a apresentação do protótipo, o volume esperado é de poucas dezenas de chamadas,
o que mantém o custo abaixo de R$ 1,00. Cotação utilizada: US$ 1,00 = R$ 5,10 (setembro de 2026).

**6. Houve custo de hospedagem, domínio ou serviço pago?**
Não houve desembolso durante a execução do projeto. Um dos integrantes já possuía, antes do início do
trabalho, um servidor virtual privado (VPS) e um domínio registrado, ambos utilizados para outros
projetos pessoais. A plataforma foi hospedada nessa infraestrutura já existente, e nela também rodam
o banco de dados PostgreSQL e o servidor de arquivos SeaweedFS — ou seja, não são serviços
contratados à parte, e sim processos executados dentro do mesmo VPS.

Para fins de orçamento, registra-se quanto custariam esses recursos caso fossem contratados hoje:

| Recurso | Custo se contratado hoje | Custo efetivo no projeto |
| --- | --- | --- |
| VPS (hospeda a aplicação, o PostgreSQL e o SeaweedFS) | R$ 43,99/mês | R$ 0,00 (já pertencia ao integrante) |
| Domínio | R$ 10,00 | R$ 0,00 (já registrado) |

O único serviço com desembolso variável é a interface de programação da OpenAI, tratada na pergunta
anterior.

**7. Como contabilizar a mão de obra especializada?**
Pelas horas de desenvolvimento dos três integrantes, que atuaram como desenvolvedores full stack. A
equipe registrou uma dedicação de **3 horas por dia ao longo de 7 dias**, o que resulta em:

| Medida | Valor |
| --- | --- |
| Carga diária por integrante | 3 h |
| Dias trabalhados | 7 |
| Horas por integrante | 21 h |
| Integrantes | 3 |
| **Total de horas do projeto** | **63 h** |

O valor-hora de referência deve ser preenchido pela equipe (`[confirmar]`), com a fonte citada —
sugere-se o piso de um desenvolvedor júnior ou o valor da bolsa de estágio da área, de modo que o
custo de mão de obra seja 63 h × R$ `[confirmar]`/h.

**8. Qual é o custo orçado do produto?**
O custo efetivo do projeto foi praticamente nulo: R$ 0,00 em licenças de software, R$ 0,00 em
hospedagem e domínio (já pertencentes a um integrante) e valor inferior a R$ 1,00 no consumo da API
de inteligência artificial. O custo do produto concentra-se, portanto, nas 63 horas de mão de obra e
na depreciação dos equipamentos já pertencentes aos integrantes. Caso a infraestrutura precisasse ser
contratada, acrescentariam-se R$ 43,99 mensais pelo VPS e R$ 10,00 pelo domínio.

---

## Parte 2 — Texto final para o documento

### 4 MATERIAIS

O desenvolvimento da plataforma "Primeiro Emprego" foi conduzido integralmente com recursos
computacionais, uma vez que o produto consiste em um sistema web e não demanda matéria-prima física.
Os recursos empregados dividem-se em três categorias: equipamentos, softwares e bibliotecas de
desenvolvimento e mão de obra especializada. Optou-se, em todas as escolhas técnicas, por
ferramentas gratuitas ou de código aberto, de modo a manter o custo de licenciamento nulo e a
garantir que o protótipo possa ser reproduzido por qualquer integrante sem aquisição de software
proprietário. A relação completa dos recursos e o respectivo custo orçado são apresentados no
Quadro 1.

**Quadro 1 — Recursos necessários ao desenvolvimento do produto**

| Categoria | Recurso | Finalidade no projeto | Quantidade | Custo unitário | Custo total |
| --- | --- | --- | --- | --- | --- |
| Equipamento | Notebook `[confirmar configuração]` | Estação de desenvolvimento e testes | 3 | R$ `[confirmar]` | R$ `[confirmar]` |
| Equipamento | Conexão de internet banda larga | Acesso a repositórios e documentação | 3 | R$ `[confirmar]`/mês | R$ `[confirmar]` |
| Software | Visual Studio Code | Edição de código | 3 licenças | R$ 0,00 | R$ 0,00 |
| Software | Node.js 24 e npm | Execução do back-end e gestão de pacotes | 1 | R$ 0,00 | R$ 0,00 |
| Software | TypeScript | Linguagem de programação do front e do back | 1 | R$ 0,00 | R$ 0,00 |
| Software | Git e GitHub (plano gratuito) | Versionamento e repositório remoto | 1 | R$ 0,00 | R$ 0,00 |
| Software | Navegador Chrome/Edge | Testes de interface e exportação em PDF | 3 | R$ 0,00 | R$ 0,00 |
| Biblioteca | React 19 e React Router | Construção da interface e navegação | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | Vite | Empacotamento e servidor de desenvolvimento | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | Tailwind CSS 4 e shadcn/Base UI | Estilização e componentes de interface | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | TanStack Query | Consumo da API e cache de dados | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | React Hook Form e Zod | Formulários e validação de dados | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | Express 5 | Servidor HTTP da API | 1 | R$ 0,00 | R$ 0,00 |
| Infraestrutura | VPS (servidor virtual privado) | Hospedagem da aplicação, do PostgreSQL e do SeaweedFS | 1 | R$ 43,99/mês (já pertencente ao integrante) | R$ 0,00 |
| Infraestrutura | Domínio na internet | Endereço público da plataforma | 1 | R$ 10,00 (já registrado) | R$ 0,00 |
| Serviço | PostgreSQL 18 | Persistência de usuários, currículos, resultados, anexos e interações de IA | 1 | R$ 0,00 (executado no VPS) | R$ 0,00 |
| Serviço | SeaweedFS com API S3 | Armazenamento dos documentos enviados pelo candidato | 1 | R$ 0,00 (executado no VPS) | R$ 0,00 |
| Serviço | API da OpenAI (`gpt-4o-mini`) | Geração de resumo, análise de aderência à vaga, carta de apresentação e devolutiva de entrevista | por uso | ~R$ 0,002 por chamada | inferior a R$ 1,00 |
| Biblioteca | node-postgres (`pg`) | Acesso ao banco de dados | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | SDK da OpenAI | Integração com o provedor de IA | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | AWS SDK v3 (S3) e Multer | Upload e download dos documentos | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | jsonwebtoken e scrypt | Autenticação e proteção de senhas | 1 | R$ 0,00 | R$ 0,00 |
| Mão de obra | Desenvolvimento full stack | Análise, implementação e testes do sistema (3 h/dia por 7 dias, 3 integrantes) | 63 h | R$ `[confirmar]`/h | R$ `[confirmar]` |
| **Total** | | | | | **R$ `[confirmar]`** |

Fonte: elaborado pelos autores (2026).

Cabe destacar que não houve desembolso com hospedagem, domínio ou licenças durante a execução do
projeto. Um dos integrantes já dispunha, antes do início do trabalho, de um servidor virtual privado
e de um domínio registrado, utilizados em projetos pessoais anteriores; a plataforma foi hospedada
nessa infraestrutura, na qual também são executados o banco de dados PostgreSQL e o servidor de
arquivos SeaweedFS, de modo que não constituem serviços contratados à parte. Registra-se, para fins
de orçamento, que a contratação desses recursos custaria hoje R$ 43,99 mensais pelo servidor virtual
privado e R$ 10,00 pelo domínio.

O único item de custo variável é a interface de programação da OpenAI, cobrada por token processado.
Foi adotado o modelo `gpt-4o-mini`, ao preço de US$ 0,15 por milhão de tokens de entrada e US$ 0,60
por milhão de tokens de saída, o que corresponde a aproximadamente R$ 0,002 por requisição da
plataforma — valor que mantém o consumo do protótipo abaixo de R$ 1,00. A mão de obra corresponde a
63 horas, resultado de 3 horas diárias durante 7 dias para cada um dos três integrantes. Dessa forma,
o custo orçado do produto concentra-se na mão de obra especializada e na depreciação dos equipamentos
já pertencentes aos integrantes.

---

## Pendências da equipe neste item

- [ ] Preencher a configuração e o valor dos notebooks (ou registrar depreciação/valor de mercado).
- [x] Total de horas registrado: 3 h/dia × 7 dias × 3 integrantes = 63 h.
- [ ] Definir o valor-hora de referência e citar a fonte adotada.
- [ ] Confirmar o consumo real da API da OpenAI no painel da conta (estimativa: inferior a R$ 1,00).
- [ ] Fechar o custo total orçado — este valor será retomado no item 6 (custo real).
