import { z } from "zod"

export const resumeSummarySchema = z.object({
  resumeId: z.string().uuid("Informe um curriculo valido"),
})

export const jobMatchSchema = z.object({
  resumeId: z.string().uuid("Informe um curriculo valido"),
  jobDescription: z
    .string()
    .trim()
    .min(80, "Cole a descricao da vaga com ao menos 80 caracteres")
    .max(8000, "Descricao muito longa"),
})

export const interviewFeedbackSchema = z.object({
  question: z.string().trim().min(10, "Informe a pergunta da entrevista").max(500),
  answer: z
    .string()
    .trim()
    .min(40, "Escreva uma resposta com ao menos 40 caracteres")
    .max(4000, "Resposta muito longa"),
})

export const coverLetterSchema = jobMatchSchema

export type ResumeSummaryInput = z.infer<typeof resumeSummarySchema>
export type JobMatchInput = z.infer<typeof jobMatchSchema>
export type InterviewFeedbackInput = z.infer<typeof interviewFeedbackSchema>
export type CoverLetterInput = z.infer<typeof coverLetterSchema>
