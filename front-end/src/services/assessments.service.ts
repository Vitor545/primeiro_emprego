import { httpClient } from "./api/http-client"
import type {
  Assessment,
  AssessmentAttempt,
  AssessmentResult,
  AssessmentSummary,
} from "@/types/assessment"

export const assessmentsService = {
  list: () => httpClient<AssessmentSummary[]>("/assessments"),

  getBySlug: (slug: string) => httpClient<Assessment>(`/assessments/${slug}`),

  submit: (slug: string, answers: Record<string, string>) =>
    httpClient<AssessmentResult>(`/assessments/${slug}/attempts`, {
      method: "POST",
      body: { answers },
    }),

  history: (slug: string) => httpClient<AssessmentAttempt[]>(`/assessments/${slug}/attempts`),
}
