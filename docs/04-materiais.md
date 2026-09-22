# 4 MATERIAIS

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
| Equipamento | Notebook (processador Intel Core i5, 16 GB de memória) | Estação de desenvolvimento e testes | 3 | R$ 0,00 (já pertencente aos integrantes) | R$ 0,00 |
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
| Mão de obra | Desenvolvimento full stack | Análise, implementação e testes do sistema (3 h/dia por 7 dias, 3 integrantes) | 63 h | R$ 0,00 (trabalho dos próprios integrantes) | R$ 0,00 |
| **Total** | | | | | **R$ 0,00** (mais o consumo da API de IA, inferior a R$ 1,00) |

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
63 horas, resultado de 3 horas diárias durante 7 dias para cada um dos três integrantes, executadas
pelos próprios autores no âmbito acadêmico do trabalho e, portanto, sem remuneração. Os três
notebooks utilizados como estação de desenvolvimento, com processador Intel Core i5 e 16 GB de
memória, já pertenciam aos integrantes. Dessa forma, o custo orçado do produto é de R$ 0,00,
acrescido apenas do consumo da interface de programação de inteligência artificial, inferior a
R$ 1,00 no período.
