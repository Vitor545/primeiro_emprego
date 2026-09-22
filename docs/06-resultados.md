# 6 RESULTADOS

O produto final consiste em uma aplicação web composta por dois programas independentes: uma
interface executada no navegador, construída em React com TypeScript, e um servidor de aplicação em
Node.js com banco de dados PostgreSQL, que expõe vinte e seis endpoints de negócio. A interface reúne
doze telas funcionais, além da tela de tratamento de endereço inexistente. O sistema integra, ainda,
dois serviços externos: um provedor de modelos de linguagem, responsável pelos recursos de
inteligência artificial, e um servidor de arquivos compatível com o protocolo S3, responsável pelo
armazenamento dos documentos do candidato. O código-fonte entregue soma 6.391 linhas distribuídas em
173 arquivos, sendo 2.412 linhas no servidor de aplicação e 3.979 na interface.

Em situação de serviço, a operação ocorre da seguinte forma. O usuário realiza o cadastro informando
nome, endereço eletrônico e senha, sendo autenticado automaticamente e direcionado ao painel de
progresso. O painel apresenta quatro indicadores — quantidade de currículos criados, maior percentual
de compatibilidade obtido, simulações concluídas e guias lidos — e a trilha de cinco etapas de
preparação, na qual cada item indica a tela em que pode ser resolvido. Na tela de currículos, o
usuário cria uma nova versão e preenche o formulário guiado, dividido em dados principais, resumo
profissional, formação acadêmica, experiências e projetos, competências e idiomas. Durante o
preenchimento, a pré-visualização do documento é atualizada e a lista de critérios de triagem
automática indica os itens atendidos e os pendentes, com a respectiva orientação de correção. O mesmo
editor disponibiliza o assistente de inteligência artificial, que redige o resumo profissional a
partir dos dados informados, compara o currículo com a descrição de uma vaga colada pelo usuário —
apresentando a nota de aderência, as palavras-chave atendidas, as ausentes e as sugestões de ajuste —
e elabora uma carta de apresentação. Ao salvar, o servidor recalcula o percentual de compatibilidade;
ao acionar a exportação, o navegador imprime exclusivamente o documento, gerando arquivo em PDF com
texto selecionável.

Na tela de simulações, o usuário responde a questões situacionais e recebe, ao final, a pontuação
obtida, o percentual correspondente, a classificação do nível de preparo e a devolutiva textual
associada à faixa alcançada. Na tela de treino de entrevista, escolhe uma pergunta frequente de
processos seletivos, escreve a resposta em texto livre e recebe uma avaliação segundo a técnica STAR,
composta por nota de zero a cem, indicação de quais elementos da técnica foram contemplados, pontos
fortes, pontos a melhorar e uma versão reescrita da resposta. Na tela de documentos, envia arquivos
nos formatos PDF, DOC, DOCX, PNG ou JPG, com até cinco megabytes, que são transferidos para o
armazenamento de objetos e recuperados por meio de endereço assinado com validade de quinze minutos.
Nos guias, o conteúdo é apresentado em seções e pode ser marcado como lido. Cada uma dessas ações
atualiza automaticamente os indicadores do painel de progresso.

Os dados quantitativos do produto entregue são apresentados no Quadro 2.

**Quadro 2 — Dados quantitativos do produto entregue**

| Indicador | Valor |
| --- | --- |
| Arquivos de código-fonte | 173 |
| Linhas de código (servidor de aplicação) | 2.412 |
| Linhas de código (interface) | 3.979 |
| Linhas de código (total) | 6.391 |
| Módulos de domínio no servidor de aplicação | 8 |
| Endpoints de negócio expostos pela API | 26 |
| Tabelas no banco de dados | 6 |
| Telas funcionais na interface | 12 (mais tela de erro) |
| Critérios avaliados na análise de compatibilidade ATS | 7 |
| Recursos de inteligência artificial | 4 |
| Simulações comportamentais | 3 |
| Questões situacionais | 15 |
| Guias de carreira | 3 |

Fonte: elaborado pelos autores (2026).

Quanto à verificação do sistema, a checagem estática de tipos e a análise estática de código foram
concluídas sem apontamentos nos dois projetos, e o pacote de produção da interface foi gerado em
1,06 segundo, resultando em 534,65 kB de JavaScript (162,42 kB após compressão) e 45,07 kB de folhas
de estilo (8,42 kB após compressão). Na execução das rotas com dados reais, o banco de dados foi
criado e estruturado automaticamente pelas migrações; a autenticação retornou token válido; o
currículo de exemplo obteve 71% de compatibilidade com os critérios de triagem automática,
correspondendo a cinco dos sete critérios atendidos; o envio das respostas da simulação de entrevista
comportamental retornou 10 pontos de 10 possíveis, equivalentes a 100% e à classificação "preparo
avançado"; e a consulta ao painel retornou 20% de conclusão da trilha, valor compatível com a única
etapa cumprida até aquele momento.

Quanto à disponibilização, o produto foi empacotado em contêineres e publicado em um cluster
Kubernetes hospedado no servidor virtual privado da equipe, ficando acessível ao público em
`https://emprego.vitorsouzadasilva.tech`, com certificado de segurança emitido automaticamente pela
autoridade certificadora Let's Encrypt. A interface e o servidor de aplicação respondem sob o mesmo
endereço — a raiz entrega a interface e o caminho `/api`, a interface de programação —, enquanto o
banco de dados é acessado exclusivamente pela rede interna do cluster, sem exposição adicional. A
verificação do ambiente publicado registrou resposta 200 na rota de saúde, autenticação bem-sucedida
e consulta ao painel de progresso com os dados esperados.

Registra-se que os dois recursos dependentes de serviços externos — inteligência artificial e
armazenamento de documentos — foram implementados e tiveram seu comportamento de falha verificado,
porém não puderam ser validados de ponta a ponta no ambiente de testes: as credenciais disponíveis
foram recusadas pelos respectivos provedores, com os códigos 401 e 403. Nessas condições, o servidor
de aplicação respondeu com código 502 e mensagem orientando a verificação das credenciais, e os
demais módulos permaneceram operantes, conforme previsto no projeto.

O paralelo entre as funcionalidades idealizadas no item 2.2 e o que foi efetivamente produzido é
apresentado no Quadro 3.

**Quadro 3 — Expectativa e realidade das funcionalidades do produto**

| Funcionalidade idealizada (item 2.2) | O que foi produzido | Situação |
| --- | --- | --- |
| Gerador de currículos dinâmico otimizado para softwares de recrutamento | Formulário guiado com seções de contato, resumo, formação, experiências, competências e idiomas; pré-visualização em tempo real; múltiplas versões por usuário; análise automática de sete critérios de triagem com percentual de compatibilidade e orientação de correção; exportação em PDF com texto selecionável | Entregue |
| Biblioteca de testes e guias comportamentais | Três simulações com quinze questões situacionais, pontuação por alternativa, classificação em faixas de preparo e devolutiva textual; três guias divididos em seções, com marcação de leitura | Entregue |
| Painel de controle (dashboard) para acompanhamento de progresso | Painel com quatro indicadores consolidados e trilha de cinco etapas, atualizada automaticamente a cada ação do usuário | Entregue |
| Formulários que simulam cenários práticos de recursos humanos | Questões construídas a partir de situações típicas de processo seletivo, com registro das tentativas para acompanhamento da evolução | Entregue |
| — | Cadastro e autenticação com senha protegida por derivação criptográfica e sessão por token assinado | Acrescentado como requisito técnico |
| — | Assistente de inteligência artificial no editor: geração do resumo profissional e da carta de apresentação | Acrescentado; pendente de credencial válida |
| — | Análise de aderência entre currículo e descrição de vaga, com nota e palavras-chave ausentes | Acrescentado; pendente de credencial válida |
| — | Treino de entrevista com devolutiva pela técnica STAR | Acrescentado; pendente de credencial válida |
| — | Repositório de documentos do candidato em armazenamento de objetos, com download por endereço assinado | Acrescentado; pendente de credencial válida |
| Publicação da plataforma para acesso externo | Publicada em cluster Kubernetes no servidor da equipe, em `https://emprego.vitorsouzadasilva.tech`, com certificado TLS automático | Entregue além do previsto |

Fonte: elaborado pelos autores (2026).

O custo real do produto é apresentado no Quadro 4, no mesmo formato adotado no item 4.

**Quadro 4 — Custo real do produto**

| Categoria | Recurso | Quantidade | Custo orçado | Custo real |
| --- | --- | --- | --- | --- |
| Equipamento | Notebooks dos integrantes (Intel Core i5, 16 GB) | 3 | R$ 0,00 | R$ 0,00 |
| Software e bibliotecas | Node.js, TypeScript, Vite, React, Tailwind CSS, TanStack Query, React Hook Form, Zod, Express, node-postgres, AWS SDK, Git, Visual Studio Code | — | R$ 0,00 | R$ 0,00 |
| Infraestrutura | VPS que hospeda a aplicação, o PostgreSQL e o SeaweedFS | 1 | R$ 43,99/mês | R$ 0,00 (já pertencia a um integrante) |
| Infraestrutura | Domínio na internet | 1 | R$ 10,00 | R$ 0,00 (já registrado) |
| Serviços | API de inteligência artificial `gpt-4o-mini` (por token) | ~R$ 0,002 por chamada | inferior a R$ 1,00 | R$ `[confirmar no painel]` |
| Mão de obra | Desenvolvimento full stack (3 h/dia × 7 dias × 3 integrantes) | 63 h | R$ 0,00 | R$ 0,00 |
| **Total** | | | **R$ 0,00** | **R$ 0,00** (mais o consumo de IA, inferior a R$ 1,00) |

Fonte: elaborado pelos autores (2026).

Não houve custo real com licenças de software, hospedagem ou domínio. Todas as ferramentas empregadas
são gratuitas ou de código aberto, e o servidor virtual privado e o domínio utilizados já pertenciam
a um dos integrantes antes do início do projeto, sendo o banco de dados PostgreSQL e o servidor de
arquivos SeaweedFS executados nesse mesmo servidor. Caso fosse necessário contratá-los, o custo seria
de R$ 43,99 mensais pelo servidor e R$ 10,00 pelo domínio. O único item de custo variável é o consumo
da interface de programação de inteligência artificial, cobrado por token processado, estimado em
aproximadamente R$ 0,002 por requisição e inferior a R$ 1,00 no período. A mão de obra corresponde a 63 horas, resultantes de 3 horas
diárias durante 7 dias para cada um dos três integrantes, realizadas pelos próprios autores no âmbito
acadêmico do trabalho e, portanto, sem remuneração. O custo real do produto é, dessa forma, de
R$ 0,00, não havendo diferença em relação ao orçado.
