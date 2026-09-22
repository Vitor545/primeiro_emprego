import { HttpError } from "../../shared/errors/http-error.js"
import { createId } from "../../shared/utils/id.js"
import { assessments } from "./assessments.data.js"
import { assessmentsRepository } from "./assessments.repository.js"
import type { SubmitAttemptInput } from "./assessments.schemas.js"
import type { Assessment, AssessmentResult, AssessmentSummary } from "./assessments.types.js"

const toSummary = (assessment: Assessment): AssessmentSummary => ({
  slug: assessment.slug,
  title: assessment.title,
  description: assessment.description,
  category: assessment.category,
  durationMinutes: assessment.durationMinutes,
  questionCount: assessment.questions.length,
})

const findOrFail = (slug: string) => {
  const assessment = assessments.find((item) => item.slug === slug)
  if (!assessment) throw HttpError.notFound("Teste nao encontrado")

  return assessment
}

const maxScore = (assessment: Assessment) =>
  assessment.questions.reduce(
    (total, question) => total + Math.max(...question.options.map((option) => option.score)),
    0
  )

const resolveRange = (assessment: Assessment, percentage: number) =>
  assessment.resultRanges.find((range) => percentage >= range.minPercentage) ??
  assessment.resultRanges[assessment.resultRanges.length - 1]

export const assessmentsService = {
  list(): AssessmentSummary[] {
    return assessments.map(toSummary)
  },

  getBySlug(slug: string): Assessment {
    return findOrFail(slug)
  },

  submit(userId: string, slug: string, { answers }: SubmitAttemptInput): AssessmentResult {
    const assessment = findOrFail(slug)

    const unanswered = assessment.questions.filter((question) => !answers[question.id])
    if (unanswered.length > 0) {
      throw HttpError.badRequest("Responda todas as questoes antes de enviar", {
        questions: unanswered.map((question) => question.id),
      })
    }

    const score = assessment.questions.reduce((total, question) => {
      const option = question.options.find((item) => item.id === answers[question.id])
      if (!option) throw HttpError.badRequest(`Alternativa invalida na questao ${question.id}`)

      return total + option.score
    }, 0)

    const total = maxScore(assessment)
    const percentage = total === 0 ? 0 : Math.round((score / total) * 100)
    const range = resolveRange(assessment, percentage)

    const attempt = assessmentsRepository.createAttempt({
      id: createId(),
      userId,
      assessmentSlug: slug,
      score,
      total,
      answers,
      createdAt: new Date().toISOString(),
    })

    return { attempt, percentage, title: range.title, feedback: range.feedback }
  },

  history(userId: string, slug?: string) {
    return slug
      ? assessmentsRepository.listByAssessment(userId, slug)
      : assessmentsRepository.listByUser(userId)
  },
}
