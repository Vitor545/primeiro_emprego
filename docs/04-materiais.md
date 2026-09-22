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
Todos os softwares empregados são gratuitos ou de código aberto, o que zera o custo de licenças:

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
| SQLite (módulo nativo do Node) | Banco de dados da aplicação | Gratuito (embutido no Node) |
| jsonwebtoken + scrypt (Node) | Autenticação e proteção de senhas | Gratuito (open source/nativo) |
| Visual Studio Code | Editor de código | Gratuito |
| Git e GitHub | Versionamento e repositório do código | Gratuito (plano free) |
| Navegador Chrome/Edge | Testes da interface e exportação do currículo em PDF | Gratuito |

**5. Houve custo de hospedagem, domínio ou serviço pago?**
Não. O protótipo é executado localmente (API em `localhost:3333` e interface em `localhost:5173`) e
o banco de dados é um arquivo SQLite local, sem servidor contratado.

**6. Como contabilizar a mão de obra especializada?**
Pelas horas de desenvolvimento dos três integrantes, que atuaram como desenvolvedores full stack.
O total de horas e o valor-hora de referência devem ser preenchidos pela equipe (`[confirmar]`),
pois dependem do registro real de dedicação no semestre. Sugere-se usar como referência o valor-hora
de um desenvolvedor júnior, citando a fonte adotada.

**7. Qual é o custo orçado do produto?**
O custo direto em software e serviços é **R$ 0,00**. O custo total do produto corresponde
essencialmente ao valor da mão de obra e à depreciação dos equipamentos já pertencentes aos
integrantes.

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
| Biblioteca | SQLite (módulo nativo do Node) | Persistência de usuários, currículos e resultados | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | jsonwebtoken e scrypt | Autenticação e proteção de senhas | 1 | R$ 0,00 | R$ 0,00 |
| Mão de obra | Desenvolvimento full stack | Análise, implementação e testes do sistema | `[confirmar]` h | R$ `[confirmar]`/h | R$ `[confirmar]` |
| **Total** | | | | | **R$ `[confirmar]`** |

Fonte: elaborado pelos autores (2026).

Cabe destacar que não houve contratação de serviços de hospedagem, domínio ou banco de dados em
nuvem, visto que o protótipo é executado em ambiente local: a interface roda no servidor de
desenvolvimento do Vite e a API, em Node.js, armazena os dados em um arquivo SQLite local. Dessa
forma, o custo orçado concentra-se na mão de obra especializada e no uso de equipamentos já
pertencentes aos integrantes da equipe.

---

## Pendências da equipe neste item

- [ ] Preencher a configuração e o valor dos notebooks (ou registrar depreciação/valor de mercado).
- [ ] Registrar o total de horas dedicadas por integrante e o valor-hora de referência, com fonte.
- [ ] Fechar o custo total orçado — este valor será retomado no item 6 (custo real).
