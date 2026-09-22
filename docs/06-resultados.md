# 6 RESULTADOS

O produto final é um site com duas partes: as telas, feitas em React com TypeScript e abertas no
navegador, e o servidor, feito em Node.js com banco de dados PostgreSQL, que oferece vinte e seis
endereços de acesso. O site tem doze telas, além da tela de erro. O sistema também usa dois serviços
de fora: a inteligência artificial e um servidor de arquivos, onde ficam os documentos do candidato.
O site está no ar em `https://emprego.vitorsouzadasilva.tech`, com certificado de segurança emitido
pela Let's Encrypt. As telas aparecem nas Figuras 3 a 14.

O funcionamento é o seguinte. O usuário se cadastra e vai para o painel, que mostra quatro números —
currículos criados, maior nota de compatibilidade, simulações concluídas e guias lidos — e uma trilha
de cinco etapas, em que cada item leva à tela onde ele pode ser resolvido. Na tela de currículos, o
usuário preenche um formulário com contato, resumo, formação, experiências, competências e idiomas,
enquanto vê o documento sendo montado ao lado e a lista do que já está certo e do que falta. Nessa
mesma tela, a inteligência artificial escreve o resumo, compara o currículo com uma vaga colada pelo
usuário — devolvendo a nota de aderência, as palavras-chave encontradas, as que faltam e o que
ajustar — e gera uma carta de apresentação. Ao salvar, o servidor recalcula a nota; ao clicar em
exportar, o navegador imprime apenas o currículo, em PDF com texto que pode ser selecionado. Na tela
de simulações, o usuário responde às questões e recebe a pontuação, a porcentagem, o nível de preparo
e o comentário sobre o resultado. Na tela de treino de entrevista, ele escreve a resposta com as
próprias palavras e recebe uma avaliação pela técnica STAR, com nota, indicação do que a resposta
contemplou, pontos fortes, pontos a melhorar e a resposta reescrita. Na tela de documentos, envia
arquivos em PDF, DOC, DOCX, PNG ou JPG de até cinco megabytes, baixados depois por um link
temporário. Nos guias, o texto aparece dividido em seções e pode ser marcado como lido. Cada uma
dessas ações atualiza os números do painel.

Os dados do produto estão no Quadro 2.

**Quadro 2 — Números do produto entregue**

| Indicador | Valor |
| --- | --- |
| Arquivos de código | 173 |
| Linhas de código (servidor 2.412 + site 3.979) | 6.391 |
| Assuntos separados no servidor | 8 |
| Endereços de acesso da API | 26 |
| Tabelas no banco de dados | 6 |
| Telas no site | 12 (mais a tela de erro) |
| Pontos conferidos na nota de compatibilidade | 7 |
| Recursos com inteligência artificial | 4 |
| Simulações / questões | 3 / 15 |
| Guias de carreira | 3 |
| Tamanho do pacote final (JavaScript / CSS) | 534,65 kB / 45,07 kB |

Fonte: elaborado pelos autores (2026).

Nos testes, a conferência automática de erros de programação e a análise do padrão do código
apontaram zero problemas nas duas partes, e o pacote final do site foi gerado em 1,06 segundo. Ao
testar os endereços do servidor com dados reais, o banco de dados foi criado com as seis tabelas; o
login devolveu o código de acesso; o currículo de exemplo recebeu nota 71 de compatibilidade, com
cinco dos sete pontos atendidos; a simulação de entrevista devolveu 10 pontos de 10, ou seja, 100%; e
o painel marcou 20% da trilha, que corresponde à única etapa cumprida até ali. No site já publicado,
o endereço de verificação respondeu com código 200 e o login funcionou. Os recursos de inteligência
artificial também foram testados no site publicado: a comparação do currículo com uma vaga de estágio
em desenvolvimento devolveu 60 de aderência e apontou quatro palavras-chave ausentes; a carta de
apresentação saiu com 160 palavras; e a avaliação de uma resposta de entrevista devolveu nota 85, com
os quatro elementos da técnica STAR identificados. No envio de documentos, um arquivo PDF foi
gravado no servidor de arquivos, listado na tela e baixado pelo link temporário com o mesmo conteúdo
enviado.

A comparação entre o que foi planejado no item 2.2 e o que foi entregue está no Quadro 3.

**Quadro 3 — O que foi planejado e o que foi feito**

| O que foi planejado (item 2.2) | O que foi feito |
| --- | --- |
| Gerador de currículos preparado para os sistemas de triagem | Formulário com seis seções, várias versões por usuário, pré-visualização, nota de compatibilidade em sete pontos com explicação do que corrigir e exportação em PDF com texto selecionável |
| Biblioteca de testes e guias comportamentais | Três simulações com quinze questões, pontuação, nível de preparo e comentário; três guias divididos em seções, com marcação de leitura |
| Painel para acompanhar o progresso | Quatro números e trilha de cinco etapas, atualizados a cada ação |
| Formulários que simulam situações de recursos humanos | Questões baseadas em situações de processo seletivo, com registro das tentativas |
| — | Cadastro e login com senha criptografada e código de acesso |
| — | Quatro recursos de inteligência artificial: resumo, comparação com vaga, carta de apresentação e avaliação de entrevista |
| — | Área de documentos do candidato, com download por link temporário |
| — | Site publicado na internet, com certificado de segurança automático |

Fonte: elaborado pelos autores (2026).

O custo real do produto está no Quadro 4, no mesmo formato do item 4.

**Quadro 4 — Custo real do produto**

| Categoria | Recurso | Quantidade | Custo previsto | Custo real |
| --- | --- | --- | --- | --- |
| Equipamento | Notebooks (Intel Core i5, 16 GB) | 3 | R$ 0,00 | R$ 0,00 |
| Programas e bibliotecas | Node.js, TypeScript, Vite, React, Tailwind CSS, Express, node-postgres, Git, Visual Studio Code | — | R$ 0,00 | R$ 0,00 |
| Serviço | Servidor na internet (hospeda o site, o banco e os arquivos) | 1 | R$ 43,99/mês | R$ 0,00 (já era de um integrante) |
| Serviço | Domínio | 1 | R$ 10,00 | R$ 0,00 (já registrado) |
| Serviço | Inteligência artificial `gpt-4o-mini` | por uso | R$ 1,00 | R$ 1,00 |
| Mão de obra | Desenvolvimento (3 h/dia × 7 dias × 3 integrantes) | 63 h | R$ 0,00 | R$ 0,00 |
| **Total** | | | **R$ 1,00** | **R$ 1,00** |

Fonte: elaborado pelos autores (2026).

O servidor e o domínio já eram de um dos integrantes antes do projeto, e é dentro desse servidor que
rodam o banco de dados e o armazenamento de arquivos; contratá-los hoje custaria R$ 43,99 por mês e
R$ 10,00. As 63 horas de trabalho foram feitas pelos próprios autores, sem pagamento. Assim, o custo
real se resume ao uso da inteligência artificial e ficou igual ao previsto.
