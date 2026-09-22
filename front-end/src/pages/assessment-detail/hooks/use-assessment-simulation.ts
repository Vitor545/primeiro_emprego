import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner"

import { APP_ROUTES } from "@/constants/app-routes"
import { QUERY_KEYS } from "@/constants/query-keys"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { assessmentsService } from "@/services/assessments.service"
import type { AssessmentResult } from "@/types/assessment"

export const useAssessmentSimulation = () => {
  const { slug = "" } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<AssessmentResult | null>(null)

  const { data: assessment, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.assessment(slug),
    queryFn: () => assessmentsService.getBySlug(slug),
    enabled: Boolean(slug),
  })

  const submitMutation = useMutation({
    mutationFn: () => assessmentsService.submit(slug, answers),
    onSuccess: (data) => {
      setResult(data)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.progress })
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })

  const answeredCount = Object.keys(answers).length
  const questionCount = assessment?.questions.length ?? 0

  return {
    assessment,
    result,
    answers,
    isLoading,
    isError,
    isSubmitting: submitMutation.isPending,
    canSubmit: questionCount > 0 && answeredCount === questionCount,
    answeredCount,
    questionCount,
    onSelect: (questionId: string, optionId: string) =>
      setAnswers((current) => ({ ...current, [questionId]: optionId })),
    onSubmit: () => submitMutation.mutate(),
    onRestart: () => {
      setAnswers({})
      setResult(null)
    },
    onBack: () => navigate(APP_ROUTES.assessments),
  }
}
