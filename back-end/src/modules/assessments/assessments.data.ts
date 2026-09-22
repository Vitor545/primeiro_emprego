import type { Assessment, AssessmentResultRange } from "./assessments.types.js"

const defaultRanges: AssessmentResultRange[] = [
  {
    minPercentage: 80,
    title: "Preparo avancado",
    feedback:
      "As respostas indicam dominio da competencia avaliada. Use exemplos concretos da sua trajetoria para sustentar esse discurso na entrevista.",
  },
  {
    minPercentage: 50,
    title: "Preparo intermediario",
    feedback:
      "A base existe, mas falta estruturar as respostas. Revise os guias indicados e pratique a tecnica STAR antes do processo seletivo.",
  },
  {
    minPercentage: 0,
    title: "Preparo inicial",
    feedback:
      "Vale estudar os guias comportamentais e refazer o teste. O objetivo e transformar experiencias do dia a dia em exemplos profissionais.",
  },
]

export const assessments: Assessment[] = [
  {
    slug: "entrevista-comportamental",
    title: "Simulacao de entrevista comportamental",
    description:
      "Cinco situacoes tipicas de entrevista para treinar respostas estruturadas sobre postura, motivacao e autoconhecimento.",
    category: "Entrevista",
    durationMinutes: 10,
    resultRanges: defaultRanges,
    questions: [
      {
        id: "q1",
        statement: "O recrutador pede para voce falar sobre si. Qual abordagem e mais adequada?",
        options: [
          { id: "a", label: "Resumir formacao, interesses tecnicos e objetivo profissional.", score: 2 },
          { id: "b", label: "Contar a historia pessoal desde a infancia.", score: 0 },
          { id: "c", label: "Responder apenas o nome e o curso.", score: 1 },
        ],
      },
      {
        id: "q2",
        statement: "Voce nao tem experiencia formal na area. Como responder sobre experiencia?",
        options: [
          { id: "a", label: "Dizer que nao possui experiencia e encerrar o assunto.", score: 0 },
          { id: "b", label: "Apresentar projetos academicos, voluntariado e cursos aplicados.", score: 2 },
          { id: "c", label: "Afirmar que ja trabalhou na area para evitar a eliminacao.", score: 0 },
        ],
      },
      {
        id: "q3",
        statement: "Ao ser questionado sobre um ponto fraco, a melhor resposta e:",
        options: [
          { id: "a", label: "Negar a existencia de pontos fracos.", score: 0 },
          { id: "b", label: "Citar uma fragilidade real e a acao tomada para desenvolve-la.", score: 2 },
          { id: "c", label: "Citar um ponto forte disfarcado de fraqueza.", score: 1 },
        ],
      },
      {
        id: "q4",
        statement: "A vaga exige uma ferramenta que voce nunca usou. Qual atitude demonstra maturidade?",
        options: [
          { id: "a", label: "Informar que desconhece e apresentar um plano de aprendizado.", score: 2 },
          { id: "b", label: "Mudar de assunto rapidamente.", score: 0 },
          { id: "c", label: "Afirmar que domina a ferramenta.", score: 0 },
        ],
      },
      {
        id: "q5",
        statement: "Ao final da entrevista, o recrutador pergunta se voce tem duvidas. O ideal e:",
        options: [
          { id: "a", label: "Perguntar sobre a rotina da equipe e as expectativas para a vaga.", score: 2 },
          { id: "b", label: "Dizer que nao tem duvidas.", score: 1 },
          { id: "c", label: "Perguntar apenas sobre ferias e beneficios.", score: 0 },
        ],
      },
    ],
  },
  {
    slug: "comunicacao-profissional",
    title: "Comunicacao profissional",
    description:
      "Avalia clareza, escuta ativa e adequacao da linguagem em situacoes de trabalho e de processo seletivo.",
    category: "Soft skills",
    durationMinutes: 8,
    resultRanges: defaultRanges,
    questions: [
      {
        id: "q1",
        statement: "Voce recebeu uma tarefa e nao entendeu o pedido. A conduta correta e:",
        options: [
          { id: "a", label: "Executar do jeito que imaginou para nao parecer despreparado.", score: 0 },
          { id: "b", label: "Perguntar objetivamente o que ficou em duvida antes de comecar.", score: 2 },
          { id: "c", label: "Aguardar que alguem explique novamente.", score: 1 },
        ],
      },
      {
        id: "q2",
        statement: "Em um e-mail para o gestor, qual formato comunica melhor?",
        options: [
          { id: "a", label: "Assunto claro, contexto curto e pedido objetivo.", score: 2 },
          { id: "b", label: "Texto longo com todo o historico do problema.", score: 1 },
          { id: "c", label: "Mensagem informal com abreviacoes.", score: 0 },
        ],
      },
      {
        id: "q3",
        statement: "Durante uma reuniao, voce discorda de uma decisao. O que fazer?",
        options: [
          { id: "a", label: "Expor o ponto com dados e ouvir a resposta.", score: 2 },
          { id: "b", label: "Silenciar e comentar depois com os colegas.", score: 0 },
          { id: "c", label: "Interromper para defender a propria opiniao.", score: 0 },
        ],
      },
      {
        id: "q4",
        statement: "Voce cometeu um erro que atrasou a entrega. A melhor conduta e:",
        options: [
          { id: "a", label: "Comunicar imediatamente e propor a correcao.", score: 2 },
          { id: "b", label: "Esperar que ninguem perceba.", score: 0 },
          { id: "c", label: "Justificar o atraso com fatores externos.", score: 1 },
        ],
      },
      {
        id: "q5",
        statement: "Escuta ativa em uma entrevista significa:",
        options: [
          { id: "a", label: "Ouvir a pergunta completa antes de responder.", score: 2 },
          { id: "b", label: "Antecipar a resposta enquanto o recrutador fala.", score: 0 },
          { id: "c", label: "Repetir literalmente a pergunta feita.", score: 1 },
        ],
      },
    ],
  },
  {
    slug: "trabalho-em-equipe",
    title: "Trabalho em equipe e organizacao",
    description:
      "Mede colaboracao, gestao de prazos e postura diante de conflitos em ambientes de primeiro emprego.",
    category: "Soft skills",
    durationMinutes: 8,
    resultRanges: defaultRanges,
    questions: [
      {
        id: "q1",
        statement: "Um colega nao entregou a parte dele e o prazo e hoje. Qual atitude e adequada?",
        options: [
          { id: "a", label: "Alinhar com o colega e comunicar o risco ao responsavel.", score: 2 },
          { id: "b", label: "Entregar apenas a propria parte sem avisar ninguem.", score: 0 },
          { id: "c", label: "Assumir toda a tarefa sozinho no ultimo momento.", score: 1 },
        ],
      },
      {
        id: "q2",
        statement: "Como organizar multiplas tarefas com prazos proximos?",
        options: [
          { id: "a", label: "Priorizar por impacto e prazo, registrando o andamento.", score: 2 },
          { id: "b", label: "Comecar pela tarefa mais facil.", score: 1 },
          { id: "c", label: "Trabalhar em todas simultaneamente.", score: 0 },
        ],
      },
      {
        id: "q3",
        statement: "Ao receber uma critica sobre seu trabalho, a postura profissional e:",
        options: [
          { id: "a", label: "Registrar os pontos e ajustar a entrega.", score: 2 },
          { id: "b", label: "Explicar por que a critica esta equivocada.", score: 0 },
          { id: "c", label: "Concordar sem entender o que deve mudar.", score: 1 },
        ],
      },
      {
        id: "q4",
        statement: "Em um projeto em grupo, a divisao de tarefas ideal considera:",
        options: [
          { id: "a", label: "Competencias de cada integrante e disponibilidade.", score: 2 },
          { id: "b", label: "Distribuicao igual sem avaliar o perfil.", score: 1 },
          { id: "c", label: "Concentracao das tarefas em quem tem mais experiencia.", score: 0 },
        ],
      },
      {
        id: "q5",
        statement: "Voce terminou suas tarefas antes do prazo. O que demonstra proatividade?",
        options: [
          { id: "a", label: "Oferecer ajuda e revisar a propria entrega.", score: 2 },
          { id: "b", label: "Aguardar a proxima demanda em silencio.", score: 1 },
          { id: "c", label: "Assumir tarefas de outra equipe sem alinhar.", score: 0 },
        ],
      },
    ],
  },
]
