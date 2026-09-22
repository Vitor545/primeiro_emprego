# Item 6 — RESULTADOS

## Parte 1 — Perguntas do roteiro e respostas

**1. O que o roteiro pede neste item?**
A apresentação do produto final por meio de descrições, dados e imagens; o relato do funcionamento em
situação de serviço; um quadro comparando as funcionalidades idealizadas (item 2.2) com as
efetivamente produzidas; dados numéricos quando couber; e a tabela de custo real, no mesmo formato do
item 4. O texto deve ser objetivo, sem adjetivos de julgamento ("bom", "ruim").

**2. Qual é o produto final entregue?**
Uma aplicação web composta por dois programas: uma API em Node.js com banco de dados PostgreSQL e uma
interface em React executada no navegador. A interface possui doze telas funcionais mais a tela de
erro, e a API expõe vinte e seis endpoints de negócio, além de um endpoint de verificação de saúde.
A plataforma integra ainda dois serviços externos: um provedor de inteligência artificial e um
servidor de arquivos compatível com o protocolo S3.

**3. Como o produto funciona em situação de serviço?**
O usuário cria uma conta ou autentica-se; é direcionado ao painel, que apresenta a trilha de cinco
etapas e quatro indicadores. Na tela de currículos, cria uma versão e preenche o formulário guiado,
acompanhando a pré-visualização do documento e a lista de critérios de triagem atendidos e pendentes.
No mesmo editor, o assistente de inteligência artificial gera o resumo profissional, compara o
currículo com a descrição de uma vaga colada pelo usuário — devolvendo nota de aderência,
palavras-chave presentes e ausentes e sugestões — e redige uma carta de apresentação. Ao salvar, o
servidor recalcula o percentual de compatibilidade; ao acionar a exportação, o navegador imprime
apenas o documento, em PDF com texto selecionável. Na tela de simulações, o usuário responde às
questões situacionais e recebe pontuação, classificação e devolutiva. Na tela de treino de entrevista,
escreve uma resposta aberta e recebe avaliação pela técnica STAR, com nota, pontos fortes, pontos a
melhorar e a resposta reescrita. Na tela de documentos, envia certificados e outros arquivos, que são
guardados no armazenamento de objetos e recuperados por endereço assinado. Nos guias, lê o conteúdo e
o marca como lido. Cada uma dessas ações atualiza automaticamente o painel de progresso.

**4. Quais dados numéricos podem ser apresentados?**
Os valores abaixo foram medidos no código-fonte entregue e no processo de verificação:

| Indicador | Valor medido |
| --- | --- |
| Arquivos de código-fonte (TypeScript/TSX) | 173 |
| Linhas de código — back-end | 2.412 |
| Linhas de código — front-end | 3.979 |
| Linhas de código — total | 6.391 |
| Módulos de domínio no back-end | 8 |
| Endpoints de negócio expostos pela API | 26 |
| Tabelas no banco de dados PostgreSQL | 6 |
| Telas funcionais na interface (+ tela de erro 404) | 12 (+1) |
| Hooks de página (regra de tela isolada da renderização) | 12 |
| Critérios avaliados pela análise de compatibilidade ATS | 7 |
| Recursos de inteligência artificial | 4 |
| Simulações comportamentais disponíveis | 3 |
| Questões situacionais implementadas | 15 |
| Perguntas do treino de entrevista | 6 |
| Guias de carreira publicados | 3 |
| Erros na verificação de tipos (TypeScript) | 0 |
| Erros na análise estática (ESLint) | 0 |
| Tempo de geração do pacote de produção | 1,06 s |
| Tamanho do pacote de produção (JavaScript) | 534,65 kB (162,42 kB comprimido) |
| Tamanho do pacote de produção (CSS) | 45,07 kB (8,42 kB comprimido) |

**5. Quais testes foram executados e qual foi o retorno?**
Foram executadas as rotas da API com dados reais, contra o banco PostgreSQL. Registros obtidos: o
banco de dados `primeiro-emprego` foi criado e as seis tabelas, geradas pelas migrações automáticas;
a autenticação retornou token válido; a criação de currículo de exemplo resultou em 71% de
compatibilidade ATS (cinco dos sete critérios atendidos); o envio das respostas da simulação
"entrevista comportamental" retornou 10 de 10 pontos, equivalente a 100% e classificação "preparo
avançado"; e a consulta ao painel retornou 20% de conclusão da trilha antes da realização das demais
etapas. A verificação de tipos e a análise estática foram concluídas sem apontamentos nos dois
projetos, e o pacote de produção foi gerado sem erros.

**6. Os recursos de inteligência artificial e de armazenamento foram validados de ponta a ponta?**
Não. As rotas foram implementadas e o comportamento de erro foi verificado, mas as credenciais dos
dois serviços externos disponíveis no ambiente de testes foram recusadas pelos próprios provedores: a
chave da interface de programação de inteligência artificial retornou o código 401
(`invalid_api_key`) e o armazenamento de objetos retornou o código 403 (`SignatureDoesNotMatch`) em
todas as operações, inclusive na listagem de buckets. Nessas condições, a API respondeu corretamente
com o código 502 e mensagem orientando a verificação das credenciais, sem interromper os demais
módulos. A validação funcional desses dois recursos depende da substituição das credenciais.

**7. Todas as funcionalidades idealizadas foram entregues?**
Sim, as quatro funcionalidades previstas no item 2.2 foram implementadas, e outras quatro foram
acrescentadas durante o desenvolvimento (assistente de currículo por inteligência artificial, análise
de aderência a vagas, treino de entrevista com devolutiva e repositório de documentos). Há duas
diferenças de implementação a registrar: a exportação em PDF foi realizada pelo mecanismo de
impressão do navegador, e não por biblioteca externa; e a plataforma é executada em ambiente local,
não tendo sido publicada em servidor de hospedagem.

**8. O que deve constar na tabela de custo real?**
Os mesmos recursos do item 4, com os valores efetivamente incorridos. Como os softwares e bibliotecas
são gratuitos e os servidores de banco de dados e de arquivos pertencem à equipe, a diferença entre
orçado e real concentra-se nas horas de desenvolvimento e no consumo da interface de programação de
inteligência artificial.

**9. Quais imagens devem ser inseridas?**
Capturas de tela do produto em funcionamento, listadas na Parte 3 deste documento.

---

## Parte 2 — Texto final para o documento

### 6 RESULTADOS

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
| Publicação da plataforma para acesso externo | Execução em ambiente local, com banco de dados e armazenamento em servidores remotos | Fora do escopo do protótipo |

Fonte: elaborado pelos autores (2026).

O custo real do produto é apresentado no Quadro 4, no mesmo formato adotado no item 4.

**Quadro 4 — Custo real do produto**

| Categoria | Recurso | Quantidade | Custo orçado | Custo real |
| --- | --- | --- | --- | --- |
| Equipamento | Notebooks dos integrantes | 3 | R$ `[confirmar]` | R$ `[confirmar]` |
| Equipamento | Conexão de internet | 3 | R$ `[confirmar]` | R$ `[confirmar]` |
| Software e bibliotecas | Node.js, TypeScript, Vite, React, Tailwind CSS, TanStack Query, React Hook Form, Zod, Express, node-postgres, AWS SDK, Git, Visual Studio Code | — | R$ 0,00 | R$ 0,00 |
| Serviços | Servidor PostgreSQL e servidor de arquivos S3 (infraestrutura da equipe) | 2 | R$ 0,00 | R$ 0,00 |
| Serviços | Interface de programação de inteligência artificial (por uso) | `[confirmar]` chamadas | R$ `[confirmar]` | R$ `[confirmar]` |
| Serviços | Hospedagem e domínio | — | R$ 0,00 | R$ 0,00 |
| Mão de obra | Desenvolvimento full stack | `[confirmar]` h | R$ `[confirmar]` | R$ `[confirmar]` |
| **Total** | | | **R$ `[confirmar]`** | **R$ `[confirmar]`** |

Fonte: elaborado pelos autores (2026).

Não houve custo real com licenças de software, hospedagem ou domínio, uma vez que todas as
ferramentas empregadas são gratuitas ou de código aberto e os servidores de banco de dados e de
arquivos pertencem à infraestrutura da própria equipe. O único item de custo variável é o consumo da
interface de programação de inteligência artificial, cobrado por volume de processamento. A diferença
entre o custo orçado e o custo real restringe-se, portanto, a esse consumo e às horas de
desenvolvimento efetivamente dedicadas ao projeto.

---

## Parte 3 — Imagens a capturar e inserir no item 6

Rode a aplicação (`npm run dev` nas duas pastas), entre com `demo@primeiroemprego.dev` / `demo1234`
e capture as telas abaixo (`Win + Shift + S`):

| Figura | Tela | O que precisa aparecer |
| --- | --- | --- |
| Figura 3 | Página inicial | Título, descrição e os quatro cartões de funcionalidades |
| Figura 4 | Cadastro ou login | Formulário preenchido (sem expor senha real) |
| Figura 5 | Painel de progresso | Os quatro indicadores e a trilha de cinco etapas |
| Figura 6 | Lista de currículos | Cartão do currículo com o selo de percentual ATS |
| Figura 7 | Editor de currículo | Formulário à esquerda, checklist ATS e pré-visualização à direita |
| Figura 8 | Assistente de IA no editor | Campo da vaga, nota de aderência e palavras-chave ausentes |
| Figura 9 | Exportação em PDF | Janela de impressão do navegador exibindo apenas o currículo |
| Figura 10 | Lista de simulações | Os três testes com duração e número de questões |
| Figura 11 | Resultado da simulação | Pontuação, percentual, classificação e devolutiva |
| Figura 12 | Treino de entrevista | Pergunta escolhida, resposta escrita e devolutiva STAR |
| Figura 13 | Documentos | Lista de arquivos enviados com data e tamanho |
| Figura 14 | Guia aberto | Seções do guia e botão de marcar como lido |

Legenda padrão: *Figura X — [descrição da tela]. Fonte: elaborado pelos autores (2026).*

## Pendências da equipe neste item

- [ ] Substituir as credenciais da IA e do armazenamento e repetir os testes das Figuras 8, 12 e 13.
- [ ] Capturar e inserir as Figuras 3 a 14.
- [ ] Preencher o custo real (horas efetivas, equipamentos e consumo de IA) no Quadro 4.
- [ ] Conferir se os valores do Quadro 4 são coerentes com os do item 4.
