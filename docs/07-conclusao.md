# Item 7 — CONCLUSÃO

> **Atenção:** o documento original traz um texto redigido para este item, mas ele descreve um
> produto diferente do que foi efetivamente construído. As divergências estão listadas na Parte 2 e o
> texto corrigido, na Parte 3.

## Parte 1 — Perguntas do roteiro e respostas

**1. O objetivo geral foi atingido?**
Sim. O objetivo geral era desenvolver um protótipo funcional do site "Primeiro Emprego" para
capacitar e fornecer ferramentas práticas a jovens em busca de inserção no mercado de trabalho. O
protótipo foi entregue com as quatro funcionalidades previstas no item 2.2 em operação, acrescidas de
quatro recursos apoiados por inteligência artificial e armazenamento de documentos.

**2. O produto funciona conforme idealizado?**
Sim, nas quatro funcionalidades previstas. Duas diferenças de implementação devem ser registradas: a
exportação do currículo em PDF é realizada pelo mecanismo de impressão do navegador, e não por
biblioteca externa de geração de arquivos; e a aplicação é executada em ambiente local, sem
publicação em servidor de hospedagem, embora o banco de dados e o armazenamento de arquivos já
operem em servidores remotos.

**3. O que foi acrescentado além do previsto?**
Quatro recursos apoiados por inteligência artificial — geração do resumo profissional, análise de
aderência entre currículo e vaga, carta de apresentação e devolutiva de resposta de entrevista pela
técnica STAR — e um repositório de documentos do candidato em armazenamento de objetos. Também foi
realizada a migração do banco de dados local para um servidor PostgreSQL, permitindo que os três
integrantes trabalhassem sobre a mesma base.

**4. Quais foram as principais dificuldades encontradas?**
Quatro, todas de natureza técnica:
- **Exportação em PDF.** A geração por biblioteca externa acrescentaria dependências e produziria um
  arquivo em que o texto é convertido em imagem, o que inviabilizaria a leitura pelos sistemas de
  triagem — exatamente o problema que o produto se propõe a resolver. Optou-se pela impressão nativa
  do navegador com folha de estilos específica, que preserva o texto selecionável.
- **Ordem de inicialização do banco de dados.** As consultas preparadas eram criadas antes da
  execução das migrações, o que impedia a carga inicial de dados. A criação do esquema foi movida
  para o módulo de conexão.
- **Respostas não estruturadas do modelo de linguagem.** Modelos de linguagem produzem texto livre,
  formato inadequado para alimentar uma interface. A solução foi exigir resposta em formato JSON,
  validá-la antes do uso e tratar o erro quando o formato não é respeitado.
- **Credenciais dos serviços externos.** No ambiente de testes, tanto a chave da interface de
  programação de inteligência artificial quanto as credenciais do armazenamento de objetos foram
  recusadas pelos provedores. O sistema foi então ajustado para tratar essas falhas explicitamente,
  informando a causa em vez de apresentar erro genérico, e para continuar operando sem os serviços.

**5. Como o produto se comporta quando os serviços externos não estão disponíveis?**
As rotas correspondentes verificam a configuração e respondem com código de serviço indisponível, e
as telas exibem aviso ao usuário. O gerador de currículo, as simulações, os guias e o painel de
progresso permanecem plenamente operantes.

**6. O custo final aumentou em relação ao orçado?**
Não houve aumento de custo com licenças, hospedagem ou domínio: todos os recursos são gratuitos ou de
código aberto e os servidores de banco de dados e de arquivos pertencem à equipe. O único custo
variável é o consumo da interface de programação de inteligência artificial, que deve ser confrontado
pela equipe com o previsto no item 4, junto com as horas de desenvolvimento.

**7. Quais limitações o produto apresenta?**
O conteúdo das simulações e dos guias é fixo, definido no código, não havendo área administrativa
para cadastro de novos conteúdos; a aplicação roda em ambiente local; os recursos de inteligência
artificial e de documentos dependem de credenciais válidas, ainda não disponíveis no ambiente de
testes; não há limite de uso das chamadas de inteligência artificial por usuário; e o projeto não
possui suíte de testes automatizados.

**8. O que se sugere para trabalhos futuros?**
Validação das credenciais e publicação da plataforma em servidor; controle de cota de uso da
inteligência artificial por usuário; suíte de testes automatizados para as regras de análise de
currículo e de pontuação das simulações; importação de currículo em PDF já existente, com
preenchimento automático do formulário; histórico de evolução das notas ao longo do tempo; geração
das questões de simulação a partir da vaga informada pelo usuário; e simulação de entrevistas por
áudio. O levantamento completo está registrado no documento de backlog do projeto.

---

## Parte 2 — Divergências entre o texto original do documento e o produto entregue

| Trecho do texto original | Problema | Correção |
| --- | --- | --- |
| "apresenta limitações no módulo de simulação comportamental, o qual opera de maneira estática, sem validação interativa" | O módulo entregue é interativo: pontua as respostas, calcula o percentual, classifica o preparo e grava a tentativa; além dele, há o treino de entrevista com devolutiva gerada por inteligência artificial | Substituir pelas limitações reais: conteúdo fixo, ausência de área administrativa e dependência de credenciais externas |
| "A principal dificuldade encontrada ocorreu durante a integração do gerador de PDF, exigindo ajustes não previstos no cronograma" | Não houve integração de gerador de PDF; a exportação usa a impressão nativa do navegador, e essa foi uma decisão de projeto | Relatar a decisão técnica e seu motivo, e as dificuldades efetivamente enfrentadas |
| "O custo final do produto registrou um aumento em relação ao orçado devido à ampliação das horas de desenvolvimento" | Não há custo de licença, hospedagem ou domínio; o único custo variável é o consumo da API de inteligência artificial | Ajustar conforme o Quadro 4 do item 6 |
| "permitindo a correta geração e exportação de documentos curriculares pelos usuários cadastrados" | Correto, mas omite as demais funcionalidades entregues | Ampliar para simulações, treino de entrevista, guias, documentos e painel |

---

## Parte 3 — Texto final para o documento

### 7 CONCLUSÃO

A execução do trabalho demonstra que o objetivo geral de desenvolver um protótipo funcional da
plataforma "Primeiro Emprego" foi atingido. O sistema operou de forma estável durante a verificação,
permitindo o cadastro e a autenticação de usuários, a construção e a exportação de currículos, a
realização das simulações comportamentais, a leitura dos guias de carreira e o acompanhamento do
progresso em um painel consolidado.

As quatro funcionalidades previstas nos objetivos do produto foram entregues. O gerador de currículos
avalia sete critérios de triagem automática e devolve ao usuário o percentual de compatibilidade
acompanhado da orientação de correção de cada item pendente; as três simulações comportamentais
calculam a pontuação das respostas, classificam o nível de preparo e registram as tentativas; os
guias apresentam o conteúdo em seções com marcação de leitura; e o painel converte essas ações em uma
trilha de cinco etapas com percentual de conclusão. Ao longo do desenvolvimento, o escopo foi ampliado
com quatro recursos apoiados por inteligência artificial — geração do resumo profissional, análise de
aderência entre currículo e descrição de vaga, elaboração de carta de apresentação e devolutiva de
resposta de entrevista segundo a técnica STAR — e com um repositório de documentos do candidato em
armazenamento de objetos. O banco de dados, inicialmente local, foi migrado para um servidor
PostgreSQL, o que permitiu o trabalho simultâneo dos integrantes sobre a mesma base.

Registram-se duas diferenças entre o previsto e o implementado. A primeira refere-se à exportação do
currículo em PDF, realizada pelo mecanismo de impressão do próprio navegador, com folha de estilos
específica, e não por biblioteca externa de geração de arquivos. A decisão decorreu de uma restrição
técnica do próprio problema tratado: bibliotecas dessa natureza tendem a converter o texto em imagem,
o que impediria a leitura do documento pelos sistemas de triagem automática, justamente a barreira que
o produto busca reduzir. A segunda refere-se ao ambiente de execução: a interface e o servidor de
aplicação operam localmente, ainda que o banco de dados e o armazenamento de arquivos estejam em
servidores remotos.

Entre as dificuldades técnicas enfrentadas, destacam-se a definição da ordem de inicialização do
banco de dados, que exigiu deslocar a criação do esquema para o módulo de conexão; a manutenção da
separação entre regra de negócio e renderização na interface, que demandou a extração de todo o
estado e de todas as chamadas à interface de programação para hooks específicos de cada página; a
obtenção de respostas estruturadas do modelo de linguagem, resolvida pela exigência de formato JSON e
pela validação da resposta antes do uso; e, por fim, a recusa das credenciais dos dois serviços
externos pelos respectivos provedores no ambiente de testes, situação que levou ao tratamento
explícito dessas falhas, de modo que o sistema informe a causa e permaneça operante nos demais
módulos.

Quanto ao custo, não houve dispêndio com licenças de software, hospedagem ou domínio, pois todas as
ferramentas utilizadas são gratuitas ou de código aberto e os servidores de banco de dados e de
arquivos pertencem à infraestrutura da equipe. O único custo variável do produto é o consumo da
interface de programação de inteligência artificial, cobrado por volume de processamento, conforme
demonstrado no Quadro 4.

O produto apresenta, ainda, limitações a serem consideradas: o conteúdo das simulações e dos guias é
definido no código-fonte, não havendo área administrativa para inclusão de novos materiais; os
recursos apoiados por inteligência artificial e o repositório de documentos dependem de credenciais
válidas, não disponíveis no ambiente de testes; não há limite de uso das chamadas de inteligência
artificial por usuário; e o projeto não possui suíte de testes automatizados. Como contribuição para
trabalhos futuros, sugere-se a publicação da plataforma em servidor, a implementação de controle de
cota de uso, a criação de testes automatizados para as regras de análise de currículo e de pontuação
das simulações, a importação de currículos em PDF já existentes com preenchimento automático do
formulário, o registro histórico da evolução das notas, a geração de questões de simulação a partir da
vaga informada pelo usuário e a simulação de entrevistas por áudio.

---

## Pendências da equipe neste item

- [ ] Confirmar, a partir do registro de horas e do painel de consumo da API de IA, se houve variação
      de custo em relação ao item 4, e ajustar o quinto parágrafo caso tenha havido.
- [ ] Verificar se a equipe deseja registrar alguma dificuldade de processo (prazos, conciliação com
      outras disciplinas) além das dificuldades técnicas relatadas.
- [ ] Caso as credenciais sejam validadas antes da entrega, ajustar o quarto e o sexto parágrafos.
