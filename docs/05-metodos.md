# 5 MÉTODOS

A construção do produto foi organizada em seis etapas encadeadas: definição do escopo, definição da
arquitetura, implementação do servidor de aplicação, implementação da interface, integração dos
serviços externos e verificação com posterior publicação.

Na primeira etapa, os objetivos do produto foram desdobrados em quatro funcionalidades verificáveis —
geração de currículo com avaliação de compatibilidade com sistemas de triagem, simulações
comportamentais, guias de carreira e painel de progresso —, lista que passou a operar como critério
de pronto. Na segunda etapa, definiu-se a arquitetura: o repositório foi dividido em duas partes
independentes, uma responsável pelas regras de negócio e pelos dados e outra pela apresentação,
comunicando-se exclusivamente por uma interface de programação sobre o protocolo HTTP, de modo que
cada parte possa ser alterada sem afetar a outra. A organização geral é apresentada na Figura 1.

Na terceira etapa, implementou-se o servidor de aplicação em Node.js com a linguagem TypeScript,
dividido em módulos por domínio. Cada módulo foi estruturado em quatro camadas de responsabilidade
única: rotas, controlador, serviço e repositório. Essa divisão foi adotada para que a regra de
negócio possa ser verificada sem depender do servidor e para que o acesso a dados fique isolado — o
que, na prática, permitiu migrar de um banco local para o sistema gerenciador PostgreSQL alterando
apenas a camada de repositório. Os dados são guardados em seis tabelas e as senhas nunca são
armazenadas em texto, mas sob a forma de derivação criptográfica, com o acesso às rotas restritas
controlado por token assinado.

Ainda nessa etapa foram implementadas as regras próprias do produto. A análise de compatibilidade
avalia sete critérios objetivos do currículo e devolve um percentual acompanhado da orientação
correspondente a cada item não atendido. A exportação em PDF utiliza o mecanismo de impressão do
próprio navegador, com folha de estilos que imprime somente o documento: a alternativa de gerar o
arquivo por biblioteca externa converteria o texto em imagem e impediria a leitura pelos sistemas de
triagem, justamente a barreira que o produto busca reduzir. As simulações atribuem pontuação a cada
alternativa, calculam o percentual sobre o máximo possível, classificam o nível de preparo e
registram a tentativa. O painel de progresso não possui dados próprios: agrega os demais módulos em
uma trilha de cinco etapas.

Na quarta etapa, implementou-se a interface em React com TypeScript. Adotou-se uma regra explícita de
escopo — recursos usados por mais de uma tela ficam em pastas globais, e o que pertence a uma única
tela reside na própria página — e estabeleceu-se que os componentes contêm apenas a renderização,
enquanto estado, chamadas à interface de programação e conversões de dados ficam concentrados em
funções próprias de cada tela. O objetivo é a manutenibilidade: a responsabilidade de cada arquivo é
previsível e a alteração de uma tela não produz efeitos sobre as demais. A navegação do usuário é
apresentada na Figura 2.

Na quinta etapa, integraram-se dois serviços externos. O primeiro é um provedor de modelos de
linguagem, responsável pela geração do resumo profissional, pela análise de aderência entre o
currículo e uma vaga informada, pela elaboração de carta de apresentação e pela devolutiva de
resposta de entrevista. Os comandos enviados ao modelo proíbem expressamente a criação de
experiências não informadas pelo candidato, de modo que a ferramenta organize o discurso sem produzir
informação falsa, e as respostas são exigidas em formato estruturado e validadas antes de chegarem à
tela. O segundo é um servidor de arquivos, que guarda os documentos do candidato mantendo em banco
apenas os metadados e entregando o download por endereço temporário. Ambas as integrações foram
construídas de modo que sua ausência não interrompa a aplicação: sem as credenciais, as telas
correspondentes avisam a indisponibilidade e os demais módulos seguem operantes.

Na sexta etapa, o sistema foi verificado por checagem de tipos, análise estática de código, geração
do pacote de produção e execução das rotas com dados reais, cobrindo cadastro, autenticação, criação
de currículo, envio de simulação e consulta ao painel. Concluída a verificação, a aplicação foi
empacotada em contêineres e publicada em um cluster Kubernetes, com certificado de segurança emitido
automaticamente. Os resultados obtidos são apresentados no item 6.

---

**Figura 1 — Arquitetura em camadas da plataforma**

```
        NAVEGADOR
┌──────────────────────────┐
│ FRONT-END (React)        │
│ Páginas → Hooks →        │
│ Serviços                 │
└───────────┬──────────────┘
            │ HTTP/JSON + token
┌───────────▼──────────────┐
│ BACK-END (Node/Express)  │
│ Rotas → Controlador →    │
│ Serviço → Repositório    │
└───────────┬──────────────┘
            │
   ┌────────┼─────────┬──────────────┐
   ▼        ▼         ▼              ▼
PostgreSQL  IA    Armazenamento   (6 tabelas)
(dados)  (4 recursos) de arquivos
```

Fonte: elaborado pelos autores (2026).

**Figura 2 — Fluxo de uso, do cadastro ao acompanhamento do progresso**

```
Cadastro/Login → PAINEL (trilha de 5 etapas)
                    │
   ┌────────────┬───┴────┬────────────┬────────────┐
   ▼            ▼        ▼            ▼            ▼
CURRÍCULOS  SIMULAÇÕES  TREINO DE   GUIAS     DOCUMENTOS
  │            │        ENTREVISTA    │            │
  ├ formulário │            │         │            │
  ├ análise ATS│            │         │            │
  ├ IA         ▼            ▼         ▼            ▼
  └ PDF     resultado   devolutiva  leitura     arquivos
   │            │            │         │            │
   └────────────┴────────────┴─────────┴────────────┘
                    ▼
        Progresso atualizado no painel
```

Fonte: elaborado pelos autores (2026).
