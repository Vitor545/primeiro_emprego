import { BarChart3, FileText, MessagesSquare, Sparkles } from "lucide-react"

export const HOME_FEATURES = [
  {
    id: "resume",
    icon: FileText,
    title: "Gerador de curriculo",
    description:
      "Preencha um formulario guiado e receba um curriculo estruturado, pronto para exportar em PDF.",
  },
  {
    id: "ats",
    icon: Sparkles,
    title: "Compatibilidade com ATS",
    description:
      "Cada curriculo e avaliado por criterios de triagem automatica, com orientacao do que corrigir.",
  },
  {
    id: "assessments",
    icon: MessagesSquare,
    title: "Simulacoes comportamentais",
    description:
      "Testes que reproduzem situacoes de entrevista e devolvem um diagnostico do seu preparo.",
  },
  {
    id: "progress",
    icon: BarChart3,
    title: "Painel de progresso",
    description: "Acompanhe as etapas concluidas e saiba qual e o proximo passo da preparacao.",
  },
] as const
