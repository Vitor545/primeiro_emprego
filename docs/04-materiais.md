# 4 MATERIAIS

Por se tratar de um site, o projeto não usou matéria-prima física: todos os recursos são
computacionais. Eles se dividem em quatro grupos: equipamentos, programas e bibliotecas de
programação, serviços de internet e mão de obra. Sempre que possível, a equipe escolheu ferramentas
gratuitas ou de código aberto, para que o custo com licenças fosse zero e qualquer integrante
pudesse reproduzir o projeto sem comprar nada. O Quadro 1 lista todos os recursos e seus custos.

**Quadro 1 — Recursos usados no desenvolvimento do produto**

| Categoria | Recurso | Para que serve no projeto | Quantidade | Custo unitário | Custo total |
| --- | --- | --- | --- | --- | --- |
| Equipamento | Notebook (processador Intel Core i5, 16 GB de memória) | Escrever e testar o código | 3 | R$ 0,00 (já eram dos integrantes) | R$ 0,00 |
| Programa | Visual Studio Code | Editor de código | 3 | R$ 0,00 | R$ 0,00 |
| Programa | Node.js 24 e npm | Rodar o servidor e instalar as bibliotecas | 1 | R$ 0,00 | R$ 0,00 |
| Programa | TypeScript | Linguagem usada no site e no servidor | 1 | R$ 0,00 | R$ 0,00 |
| Programa | Git e GitHub (plano gratuito) | Guardar o código e o histórico de alterações | 1 | R$ 0,00 | R$ 0,00 |
| Programa | Navegador Chrome ou Edge | Testar as telas e salvar o currículo em PDF | 3 | R$ 0,00 | R$ 0,00 |
| Biblioteca | React e React Router | Montar as telas e a navegação | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | Vite | Montar o pacote final do site | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | Tailwind CSS e shadcn | Estilo visual e componentes de tela | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | TanStack Query | Buscar os dados do servidor e guardá-los em memória | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | React Hook Form e Zod | Formulários e conferência dos dados digitados | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | Express | Receber os pedidos que chegam ao servidor | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | node-postgres | Conversar com o banco de dados | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | SDK da OpenAI | Conectar o sistema à inteligência artificial | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | AWS SDK e Multer | Enviar e baixar os arquivos do candidato | 1 | R$ 0,00 | R$ 0,00 |
| Biblioteca | jsonwebtoken e scrypt | Login e proteção das senhas | 1 | R$ 0,00 | R$ 0,00 |
| Serviço | Servidor na internet (VPS) | Hospedar o site, o banco de dados e os arquivos | 1 | R$ 43,99/mês (já era de um integrante) | R$ 0,00 |
| Serviço | Domínio na internet | Endereço público do site | 1 | R$ 10,00 (já registrado) | R$ 0,00 |
| Serviço | Banco de dados PostgreSQL | Guardar usuários, currículos e resultados | 1 | R$ 0,00 (roda no próprio servidor) | R$ 0,00 |
| Serviço | SeaweedFS | Guardar os documentos enviados pelo candidato | 1 | R$ 0,00 (roda no próprio servidor) | R$ 0,00 |
| Serviço | API da OpenAI (modelo `gpt-4o-mini`) | Escrever o resumo do currículo, comparar com a vaga, gerar carta e avaliar respostas de entrevista | por uso | cerca de R$ 0,002 por pedido | R$ 1,00 |
| Mão de obra | Desenvolvimento do sistema | Planejar, programar e testar (3 h por dia, por 7 dias, com 3 integrantes) | 63 h | R$ 0,00 (trabalho dos próprios integrantes) | R$ 0,00 |
| **Total** | | | | | **R$ 1,00** |

Fonte: elaborado pelos autores (2026).

A equipe não pagou por hospedagem nem por domínio. Um dos integrantes já tinha um servidor na
internet e um endereço registrado, usados em projetos anteriores, e foi neles que o site entrou no
ar. O banco de dados e o servidor de arquivos rodam dentro desse mesmo servidor, ou seja, não são
serviços contratados à parte. Se fosse preciso contratar hoje, o servidor custaria R$ 43,99 por mês e
o domínio, R$ 10,00.

O único gasto do projeto foi com a inteligência artificial, cobrada pela quantidade de texto
processado. Foi usado o modelo `gpt-4o-mini`, da OpenAI, que custa US$ 0,15 por milhão de tokens
recebidos e US$ 0,60 por milhão de tokens gerados — cerca de R$ 0,002 por pedido feito pelo site, o
que somou R$ 1,00 no período. Os três notebooks já eram dos integrantes, e as 63 horas de trabalho
foram feitas pelos próprios autores, sem pagamento. Por isso, o custo total do produto ficou em
R$ 1,00.
