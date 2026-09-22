# 5 MÉTODOS

O produto foi construído em seis etapas, nesta ordem: definição do que seria feito, definição da
estrutura do sistema, construção do servidor, construção das telas, ligação com os serviços externos
e, por fim, testes e publicação na internet.

Na primeira etapa, os objetivos do item 2.2 viraram quatro funcionalidades: gerar currículo com nota
de compatibilidade, oferecer simulações de entrevista, publicar guias de carreira e mostrar o
progresso do usuário. Essa lista serviu de referência para saber quando o produto estaria pronto. Na
segunda etapa, definiu-se a estrutura: o projeto foi dividido em duas partes independentes, uma
cuidando das regras e dos dados (o servidor) e outra cuidando das telas (o site). As duas conversam
apenas por uma API, que é o canal por onde o site pede as informações ao servidor. A divisão permite
mexer em uma parte sem quebrar a outra. A Figura 1 mostra essa organização.

Na terceira etapa, o servidor foi escrito em Node.js com a linguagem TypeScript e dividido por
assunto: login, usuários, currículos, simulações, guias, progresso, inteligência artificial e
documentos. Dentro de cada assunto, o código foi separado em quatro partes, cada uma com uma tarefa
só: as rotas dizem quais endereços existem, o controlador recebe o pedido, o serviço aplica a regra e
o repositório conversa com o banco de dados. Essa separação permite testar as regras sem ligar o
servidor inteiro e deixa o banco isolado — foi graças a ela que a equipe conseguiu trocar um banco
local pelo PostgreSQL mexendo só na última parte. Os dados ficam em seis tabelas. As senhas nunca são
guardadas como texto: passam por criptografia antes de ir para o banco. Depois do login, o usuário
recebe um código de acesso que precisa ser enviado em cada pedido às telas protegidas.

Ainda nessa etapa foram feitas as regras próprias do produto. A nota de compatibilidade confere sete
pontos do currículo (contato, cargo, resumo, formação, palavras-chave, idiomas e perfil on-line) e
devolve uma porcentagem junto com a explicação do que falta corrigir. A exportação em PDF usa a
impressão do próprio navegador, com um estilo que imprime só o documento. A equipe evitou usar um
programa externo para gerar o PDF porque esses programas costumam transformar o texto em imagem, e aí
os sistemas de triagem das empresas não conseguem ler o currículo — justamente o problema que o site
quer resolver. Nas simulações, cada alternativa vale uma pontuação; o servidor soma os pontos,
calcula a porcentagem, classifica o nível de preparo e guarda a tentativa. O painel de progresso não
tem dados próprios: ele junta as informações dos outros módulos em uma trilha de cinco etapas.

Na quarta etapa, as telas foram feitas em React com TypeScript. A equipe adotou uma regra simples de
organização: o que várias telas usam fica em pastas gerais, e o que é de uma tela só fica na pasta
dessa tela. Além disso, o arquivo da tela contém apenas o que aparece na página; tudo o que é cálculo,
chamada ao servidor ou conversão de dados fica em arquivos separados. Assim fica fácil saber onde
mexer, e alterar uma tela não afeta as outras. A Figura 2 mostra o caminho do usuário pelo site.

Na quinta etapa, dois serviços externos foram ligados ao sistema. O primeiro é a inteligência
artificial, responsável por escrever o resumo do currículo, comparar o currículo com uma vaga, gerar
a carta de apresentação e avaliar respostas de entrevista. As instruções enviadas à inteligência
artificial proíbem inventar experiências que o candidato não informou, para que a ferramenta apenas
organize o que ele já tem, sem criar informação falsa. As respostas precisam vir em um formato fixo e
são conferidas antes de aparecer na tela. O segundo serviço guarda os documentos do candidato: o
arquivo vai para um servidor de arquivos, o banco guarda só o nome e o tamanho, e o download acontece
por um link temporário, que expira em quinze minutos. Os dois serviços foram ligados de um jeito que
não derruba o site: se as senhas de acesso não estiverem configuradas, essas telas avisam que o
recurso está indisponível e o resto continua funcionando.

Na sexta etapa, o sistema foi testado de quatro formas: conferência automática de erros de
programação, análise do padrão do código, geração do pacote final do site e testes dos endereços do
servidor com dados reais, passando por cadastro, login, criação de currículo, envio de simulação e
consulta ao painel. Depois dos testes, o site e o servidor foram empacotados em contêineres e
publicados na internet, com certificado de segurança gerado automaticamente. Os resultados aparecem
no item 6.

---

**Figura 1 — Como o sistema é organizado**

```
        NAVEGADOR
┌──────────────────────────┐
│ SITE (React)             │
│ Telas → Lógica →         │
│ Chamadas ao servidor     │
└───────────┬──────────────┘
            │ pedidos pela API
┌───────────▼──────────────┐
│ SERVIDOR (Node.js)       │
│ Rotas → Controlador →    │
│ Serviço → Repositório    │
└───────────┬──────────────┘
            │
   ┌────────┼─────────┬──────────────┐
   ▼        ▼         ▼              ▼
PostgreSQL  IA    Servidor de    (6 tabelas)
(dados)  (4 usos)   arquivos
```

Fonte: elaborado pelos autores (2026).

**Figura 2 — Caminho do usuário no site**

```
Cadastro/Login → PAINEL (trilha de 5 etapas)
                    │
   ┌────────────┬───┴────┬────────────┬────────────┐
   ▼            ▼        ▼            ▼            ▼
CURRÍCULOS  SIMULAÇÕES  TREINO DE   GUIAS     DOCUMENTOS
  │            │        ENTREVISTA    │            │
  ├ formulário │            │         │            │
  ├ nota ATS   │            │         │            │
  ├ IA         ▼            ▼         ▼            ▼
  └ PDF     resultado   devolutiva  leitura     arquivos
   │            │            │         │            │
   └────────────┴────────────┴─────────┴────────────┘
                    ▼
            Painel atualizado
```

Fonte: elaborado pelos autores (2026).
