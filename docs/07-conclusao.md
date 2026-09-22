# 7 CONCLUSÃO

O trabalho alcançou o objetivo geral de criar um site funcional do "Primeiro Emprego". Durante os
testes, o sistema permitiu cadastrar e logar usuários, montar e exportar currículos, responder às
simulações, ler os guias de carreira e acompanhar o progresso pelo painel.

As quatro funcionalidades previstas foram entregues. O gerador de currículos confere sete pontos de
triagem e devolve a nota de compatibilidade junto com a explicação do que corrigir; as três
simulações somam a pontuação das respostas, indicam o nível de preparo e guardam cada tentativa; os
guias trazem o conteúdo em seções e podem ser marcados como lidos; e o painel transforma essas ações
em uma trilha de cinco etapas com a porcentagem concluída. Durante o desenvolvimento, o projeto ainda
ganhou quatro recursos com inteligência artificial — escrever o resumo do currículo, comparar o
currículo com uma vaga, gerar a carta de apresentação e avaliar respostas de entrevista pela técnica
STAR — e uma área para o candidato guardar seus documentos. O banco de dados, que no início rodava na
máquina de cada um, foi trocado por um PostgreSQL em servidor, o que permitiu que os três integrantes
trabalhassem sobre os mesmos dados.

Duas coisas saíram diferentes do previsto. A primeira é a exportação do currículo em PDF, feita pela
impressão do próprio navegador e não por um programa externo. A escolha veio de uma limitação ligada
ao próprio problema: esses programas costumam transformar o texto em imagem, e aí os sistemas de
triagem das empresas não conseguem ler o currículo — exatamente a barreira que o site quer diminuir.
A segunda diferença foi para melhor: além de rodar na máquina dos integrantes, o site foi publicado
na internet, em um servidor com certificado de segurança gerado automaticamente.

As principais dificuldades foram técnicas. O banco de dados precisava estar pronto antes de o
servidor começar a usá-lo, o que exigiu mudar a ordem em que o sistema inicia. Manter as telas
livres de regra de negócio deu trabalho: foi preciso tirar de dentro delas todo o estado e todas as
chamadas ao servidor. A inteligência artificial respondia em texto livre, formato que não serve para
alimentar uma tela, e a solução foi exigir a resposta em um formato fixo e conferi-la antes de usar.
Também foi preciso acertar a configuração de acesso ao servidor de arquivos, para que o envio e o
download dos documentos do candidato funcionassem pelo link temporário.

O projeto não teve gasto com licenças, hospedagem ou domínio. As ferramentas usadas são gratuitas ou
de código aberto, e o servidor e o endereço na internet já eram de um dos integrantes — contratá-los
hoje custaria R$ 43,99 por mês e R$ 10,00. O único gasto foi com a inteligência artificial, cobrada
pelo texto processado, cerca de R$ 0,002 por pedido, somando R$ 1,00 no período, como mostra o Quadro
4. As 63 horas de trabalho, 3 horas por dia durante 7 dias para cada integrante, não foram
remuneradas, por se tratar de trabalho acadêmico dos próprios autores. O custo final do produto foi,
portanto, de R$ 1,00.

Todas as funcionalidades estão em funcionamento no site publicado, incluindo os quatro recursos de
inteligência artificial e a área de documentos do candidato. Para trabalhos futuros, sugere-se criar
um limite de uso da inteligência artificial por usuário, escrever testes automatizados para as regras
de nota do currículo e de pontuação das simulações, permitir importar um currículo em PDF já pronto
para preencher o formulário sozinho, guardar o histórico das notas ao longo do tempo, gerar as
questões da simulação a partir da vaga informada pelo usuário, simular entrevistas por áudio e criar
uma área para cadastrar novos guias e simulações sem precisar programar.
