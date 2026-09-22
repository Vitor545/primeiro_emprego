import { assessmentsRepository } from "../assessments/assessments.repository.js"
import { assessmentsService } from "../assessments/assessments.service.js"
import { guidesService } from "../guides/guides.service.js"
import { resumesService } from "../resumes/resumes.service.js"
import type { ProgressOverview, ProgressStep } from "./progress.types.js"

const ATS_TARGET = 80

export const progressService = {
  async overview(userId: string): Promise<ProgressOverview> {
    const resumes = await resumesService.list(userId)
    const attempts = await assessmentsRepository.listByUser(userId)
    const assessmentsTotal = assessmentsService.list().length
    const guidesTotal = guidesService.total()

    const bestAtsScore = resumes.reduce((best, resume) => Math.max(best, resume.ats.score), 0)
    const assessmentsCompleted = new Set(attempts.map((attempt) => attempt.assessmentSlug)).size
    const guidesRead = await guidesService.countRead(userId)

    const steps: ProgressStep[] = [
      {
        id: "resume-created",
        label: "Criar o primeiro curriculo",
        description: "Monte um curriculo com dados de contato, formacao e competencias.",
        done: resumes.length > 0,
        href: "/curriculos",
      },
      {
        id: "resume-ats",
        label: `Atingir ${ATS_TARGET}% de compatibilidade ATS`,
        description: "Ajuste o curriculo ate cumprir a maior parte dos criterios de triagem.",
        done: bestAtsScore >= ATS_TARGET,
        href: "/curriculos",
      },
      {
        id: "assessment-done",
        label: "Concluir uma simulacao comportamental",
        description: "Responda um dos testes para receber o diagnostico de preparo.",
        done: assessmentsCompleted > 0,
        href: "/testes",
      },
      {
        id: "assessments-all",
        label: "Concluir todas as simulacoes",
        description: "Cada teste cobre uma competencia diferente avaliada em processos seletivos.",
        done: assessmentsTotal > 0 && assessmentsCompleted >= assessmentsTotal,
        href: "/testes",
      },
      {
        id: "guides-read",
        label: "Estudar os guias comportamentais",
        description: "Leia os guias para estruturar respostas e postura em entrevistas.",
        done: guidesTotal > 0 && guidesRead >= guidesTotal,
        href: "/guias",
      },
    ]

    const completedSteps = steps.filter((step) => step.done).length

    return {
      completionPercentage: Math.round((completedSteps / steps.length) * 100),
      resumeCount: resumes.length,
      bestAtsScore,
      assessmentsCompleted,
      assessmentsTotal,
      guidesRead,
      guidesTotal,
      steps,
    }
  },
}
