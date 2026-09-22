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
| API da OpenAI | Recursos de inteligência artificial da plataforma | Pago por uso (`[confirmar consumo]`) |
| SeaweedFS (API S3) | Armazenamento dos documentos enviados pelo candidato | Gratuito (open source) |
| jsonwebtoken + scrypt (Node) | Autenticação e proteção de senhas | Gratuito (open source/nativo) |
| Visual Studio Code | Editor de código | Gratuito |
| Git e GitHub | Versionamento e repositório do código | Gratuito (plano free) |
| Navegador Chrome/Edge | Testes da interface e exportação do currículo em PDF | Gratuito |

**5. Houve custo de hospedagem, domínio ou serviço pago?**
A interface e a API são executadas localmente (`localhost:5173` e `localhost:3333`), sem contratação
de hospedagem. Há, contudo, três serviços externos utilizados pelo protótipo: um servidor PostgreSQL,
um servidor de arquivos SeaweedFS compatível com o protocolo S3 — ambos já mantidos por um integrante
da equipe, sem custo adicional para o projeto — e a API da OpenAI, cobrada por uso. O consumo da API
de inteligência artificial deve ser registrado pela equipe (`[confirmar]`), sendo da ordem de
centavos por requisição no modelo utilizado.

**6. Como contabilizar a mão de obra especializada?**
Pelas horas de desenvolvimento dos três integrantes, que atuaram como desenvolvedores full stack.
O total de horas e o valor-hora de referência devem ser preenchidos pela equipe (`[confirmar]`),
pois dependem do registro real de dedicação no semestre. Sugere-se usar como referência o valor-hora
de um desenvolvedor júnior, citando a fonte adotada.

**7. Qual é o custo orçado do produto?**
O custo direto em licenças de software é **R$ 0,00**. Os únicos custos do produto são o consumo da
API de inteligência artificial (variável, por uso), o valor da mão de obra e a depreciação dos
equipamentos já pertencentes aos integrantes.

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
| Serviço | PostgreSQL 18 (servidor da equipe) | Persistência de usuários, currículos, resultados, anexos e interações de IA | 1 | R$ 0,00 | R$ 0,00 |
| Serviço | SeaweedFS com API S3 (servidor da equipe) | Armazenamento dos documentos enviados pelo candidato | 1 | R$ 0,00 | R$ 0,00 |
| Serviço | API da OpenAI (modelo `gpt-4o-mini`) | Geração de resumo, análise de aderência à vaga, carta de apresentação e devolutiva de entrevista | uso | R$ `[confirmar]` | R$ `[confirmar]` |
| Biblioteca | node-postgres (`pg`) | Acesso ao banco de dados | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | SDK da OpenAI | Integração com o provedor de IA | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | AWS SDK v3 (S3) e Multer | Upload e download dos documentos | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | jsonwebtoken e scrypt | Autenticação e proteção de senhas | 1 | R$ 0,00 | R$ 0,00 |
| Mão de obra | Desenvolvimento full stack | Análise, implementação e testes do sistema | `[confirmar]` h | R$ `[confirmar]`/h | R$ `[confirmar]` |
| **Total** | | | | | **R$ `[confirmar]`** |

Fonte: elaborado pelos autores (2026).

Cabe destacar que não houve contratação de hospedagem ou de domínio, visto que a interface e o
servidor de aplicação são executados em ambiente local. Os serviços externos utilizados — o servidor
PostgreSQL, que armazena os dados da aplicação, e o servidor SeaweedFS, que armazena os documentos
enviados pelos candidatos — são mantidos por um integrante da equipe em infraestrutura própria, não
gerando custo adicional ao projeto. O único item com custo variável é a interface de programação da
OpenAI, cobrada por volume de processamento e utilizada apenas nos quatro recursos de inteligência
artificial da plataforma. Dessa forma, o custo orçado concentra-se na mão de obra especializada, no
uso de equipamentos já pertencentes aos integrantes e no consumo da API de inteligência artificial.

---

## Pendências da equipe neste item

- [ ] Preencher a configuração e o valor dos notebooks (ou registrar depreciação/valor de mercado).
- [ ] Registrar o total de horas dedicadas por integrante e o valor-hora de referência, com fonte.
- [ ] Registrar o consumo da API da OpenAI no período (painel de uso da conta).
- [ ] Fechar o custo total orçado — este valor será retomado no item 6 (custo real).
