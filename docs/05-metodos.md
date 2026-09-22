# Item 5 — MÉTODOS

## Parte 1 — Perguntas do roteiro e respostas

**1. O que o roteiro pede neste item?**
O relato de como o produto foi construído, do início ao fim, com a finalidade de cada componente e o
motivo das escolhas técnicas, acompanhado de uma ilustração da concepção. Ao final, o leitor deve
sentir que conseguiria reproduzir a construção.

**2. Qual foi a sequência de construção?**
Seis etapas encadeadas:

| Etapa | O que foi feito |
| --- | --- |
| 1. Escopo | Os objetivos do item 2.2 viraram quatro funcionalidades verificáveis, usadas como critério de pronto |
| 2. Arquitetura | Separação do repositório em `back-end` e `front-end`, comunicando-se apenas por uma API HTTP |
| 3. Servidor | Modelo de dados, autenticação e regras de negócio |
| 4. Interface | Navegação, telas, formulários e consumo da API |
| 5. Serviços externos | Inteligência artificial e armazenamento de arquivos |
| 6. Verificação e publicação | Checagem de tipos, análise estática, testes das rotas e publicação em contêineres |

**3. Por que separar back-end e front-end?**
Para isolar responsabilidades: um lado cuida de regra de negócio e dados, o outro de apresentação.
Cada parte pode ser executada, testada e alterada sem afetar a outra.

**4. Como o servidor foi organizado?**
Em módulos por domínio (autenticação, usuários, currículos, simulações, guias, progresso,
inteligência artificial e documentos). Cada módulo tem quatro camadas de responsabilidade única:
rotas declaram os endereços, o controlador traduz o HTTP, o serviço concentra a regra de negócio e o
repositório isola o acesso ao banco. Assim a regra pode ser verificada sem depender do servidor, e
trocar o banco não exige reescrevê-la — foi exatamente o que permitiu migrar de um banco local para o
PostgreSQL alterando apenas a camada de repositório.

**5. Como funcionam as regras principais do produto?**

| Funcionalidade | Como foi resolvida |
| --- | --- |
| Análise de compatibilidade (ATS) | Um serviço avalia sete critérios objetivos do currículo (contato, cargo, resumo, formação, palavras-chave, idiomas e perfil online) e converte o resultado em percentual, com orientação do que corrigir |
| Exportação em PDF | Impressão do próprio navegador, com folha de estilos que imprime só o documento; preserva o texto selecionável, requisito para que os sistemas de triagem consigam ler o arquivo |
| Simulações | Cada alternativa tem pontuação; o servidor calcula o percentual sobre o máximo, classifica o preparo e grava a tentativa |
| Painel de progresso | Não tem dados próprios: agrega os demais módulos em uma trilha de cinco etapas |

**6. Como a interface foi organizada?**
Pela regra de que o que é usado por mais de uma tela fica em pastas globais e o que é de uma tela só
fica dentro da própria página. Os componentes contêm apenas a renderização; estado, chamadas à API e
conversões de dados ficam nos hooks. Todo acesso à API passa por uma camada de serviços, consumida
com a biblioteca TanStack Query, que cuida de carregamento, cache e atualização — por isso, ao salvar
um currículo, o painel reflete o novo progresso sem recarregar a página.

**7. Como os serviços externos foram integrados?**
A inteligência artificial responde por quatro recursos: resumo profissional, aderência à vaga, carta
de apresentação e devolutiva de entrevista. Os comandos enviados ao modelo proíbem inventar
experiências não informadas pelo candidato, e as respostas são exigidas em formato estruturado e
validadas antes do uso. O armazenamento de arquivos guarda os documentos do candidato, mantendo no
banco apenas os metadados e entregando o download por endereço temporário. Se as credenciais não
estiverem configuradas, essas telas avisam a indisponibilidade e o restante da plataforma continua
funcionando.

**8. Como o resultado foi verificado e publicado?**
Por verificação de tipos, análise estática, geração do pacote de produção e execução das rotas com
dados reais. Em seguida, a aplicação foi empacotada em contêineres e publicada em um cluster
Kubernetes, com certificado de segurança automático.

---

## Parte 2 — Texto final para o documento

### 5 MÉTODOS

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

## Parte 3 — Ilustrações do item 5

### Figura 1 — Arquitetura do sistema

Redesenhar no draw.io, Canva ou PowerPoint a partir do esquema:

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

Legenda: *Figura 1 — Arquitetura em camadas da plataforma. Fonte: elaborado pelos autores (2026).*

### Figura 2 — Fluxo do usuário

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

Legenda: *Figura 2 — Fluxo de uso, do cadastro ao acompanhamento do progresso.
Fonte: elaborado pelos autores (2026).*
