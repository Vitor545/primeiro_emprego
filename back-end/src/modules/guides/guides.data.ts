import type { Guide } from "./guides.types.js"

export const guides: Guide[] = [
  {
    slug: "curriculo-aprovado-no-ats",
    title: "Como passar pela triagem automatica (ATS)",
    summary:
      "O que os softwares de recrutamento leem no curriculo e como estruturar o documento para nao ser descartado na primeira etapa.",
    category: "Curriculo",
    readingMinutes: 6,
    sections: [
      {
        title: "O que e um ATS",
        content:
          "Applicant Tracking System e o software que recebe e classifica curriculos antes da leitura humana. Ele extrai texto, identifica campos como cargo, formacao e competencias, e compara com a descricao da vaga.",
      },
      {
        title: "Estrutura que o sistema entende",
        content:
          "Use secoes nomeadas de forma convencional: Resumo, Formacao, Experiencia, Competencias e Idiomas. Evite tabelas, colunas multiplas, caixas de texto e imagens, porque o extrator costuma embaralhar esse conteudo.",
      },
      {
        title: "Palavras-chave",
        content:
          "Repita, com honestidade, os termos tecnicos da vaga. Se o anuncio pede JavaScript e Git, escreva JavaScript e Git, e nao apenas linguagens de programacao e versionamento.",
      },
      {
        title: "Checklist final",
        content:
          "Contato completo, cargo desejado no topo, resumo de ate cinco linhas, formacao com periodo, ao menos cinco competencias e um link profissional. Exporte em PDF com texto selecionavel.",
      },
    ],
  },
  {
    slug: "primeira-entrevista",
    title: "Guia da primeira entrevista",
    summary:
      "Preparacao, roteiro de respostas e postura para quem vai participar de um processo seletivo pela primeira vez.",
    category: "Entrevista",
    readingMinutes: 8,
    sections: [
      {
        title: "Antes da entrevista",
        content:
          "Pesquise o que a empresa faz, releia a descricao da vaga e separe tres exemplos da sua trajetoria que mostrem iniciativa, aprendizado e colaboracao.",
      },
      {
        title: "Tecnica STAR",
        content:
          "Estruture cada resposta em Situacao, Tarefa, Acao e Resultado. Esse formato evita respostas vagas e mostra o raciocinio por tras da acao.",
      },
      {
        title: "Falta de experiencia",
        content:
          "Projetos academicos, trabalhos voluntarios, cursos e atividades de lideranca contam como experiencia. O que importa e descrever o problema enfrentado e o que voce fez.",
      },
      {
        title: "Perguntas ao recrutador",
        content:
          "Pergunte sobre a rotina da equipe, como o desempenho e avaliado e quais os proximos passos do processo. Isso demonstra interesse real na vaga.",
      },
    ],
  },
  {
    slug: "soft-skills-no-trabalho",
    title: "Soft skills que as empresas avaliam",
    summary:
      "Como demonstrar comunicacao, colaboracao e organizacao com exemplos concretos em vez de adjetivos genericos.",
    category: "Soft skills",
    readingMinutes: 5,
    sections: [
      {
        title: "Adjetivo nao e evidencia",
        content:
          "Dizer que e proativo nao comprova nada. Descreva a situacao em que voce percebeu um problema, a acao tomada e o resultado obtido.",
      },
      {
        title: "Comunicacao",
        content:
          "Comunicar bem e ser entendido na primeira tentativa: contexto curto, pedido objetivo e confirmacao do combinado.",
      },
      {
        title: "Colaboracao",
        content:
          "Trabalhar em equipe envolve negociar prazos, pedir ajuda cedo e avisar sobre riscos antes que virem atraso.",
      },
      {
        title: "Organizacao",
        content:
          "Registre suas tarefas, priorize por impacto e prazo e mantenha o responsavel informado sobre o andamento.",
      },
    ],
  },
]
