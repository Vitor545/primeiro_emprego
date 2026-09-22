# 7 CONCLUSÃO

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
o produto busca reduzir. A segunda diferença é favorável ao previsto: além do protótipo local, a
plataforma foi empacotada em contêineres e publicada em um cluster Kubernetes hospedado no servidor
virtual privado da equipe, tornando-se acessível publicamente com certificado de segurança emitido de
forma automática.

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
ferramentas utilizadas são gratuitas ou de código aberto e o servidor virtual privado que hospeda a
aplicação, o banco de dados e o armazenamento de arquivos já pertencia a um dos integrantes antes do
início do trabalho, assim como o domínio empregado; a contratação desses recursos custaria, nos
valores atuais, R$ 43,99 mensais e R$ 10,00, respectivamente. O único custo variável do produto é o
consumo da interface de programação de inteligência artificial, cobrado por token processado e
estimado em aproximadamente R$ 0,002 por requisição e inferior a R$ 1,00 no período, conforme
demonstrado no Quadro 4. A mão de obra totalizou 63 horas, correspondentes a 3 horas diárias durante
7 dias para cada um dos três integrantes, sem remuneração por se tratar de trabalho acadêmico dos
próprios autores. O custo final do produto foi, portanto, de R$ 0,00.

O produto apresenta, ainda, limitações a serem consideradas: o conteúdo das simulações e dos guias é
definido no código-fonte, não havendo área administrativa para inclusão de novos materiais; os
recursos apoiados por inteligência artificial e o repositório de documentos dependem de credenciais
válidas, não disponíveis no ambiente de testes; não há limite de uso das chamadas de inteligência
artificial por usuário; e o projeto não possui suíte de testes automatizados. Como contribuição para
trabalhos futuros, sugere-se a implementação de controle de cota de uso, a criação de testes automatizados para as regras de análise de currículo e de pontuação
das simulações, a importação de currículos em PDF já existentes com preenchimento automático do
formulário, o registro histórico da evolução das notas, a geração de questões de simulação a partir da
vaga informada pelo usuário e a simulação de entrevistas por áudio.
