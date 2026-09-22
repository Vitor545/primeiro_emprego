import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { useAiStatus } from "@/hooks/use-ai-status"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { aiService } from "@/services/ai.service"
import { INTERVIEW_QUESTIONS } from "../constants/interview-questions"

const MIN_ANSWER_LENGTH = 40

export const useInterviewCoach = () => {
  const { isAiEnabled } = useAiStatus()
  const [question, setQuestion] = useState<string>(INTERVIEW_QUESTIONS[0])
  const [answer, setAnswer] = useState("")

  const mutation = useMutation({
    mutationFn: () => aiService.interviewFeedback(question, answer),
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })

  return {
    isAiEnabled,
    questions: INTERVIEW_QUESTIONS,
    question,
    answer,
    feedback: mutation.data ?? null,
    isSubmitting: mutation.isPending,
    canSubmit: answer.trim().length >= MIN_ANSWER_LENGTH,
    onSelectQuestion: (value: string) => {
      setQuestion(value)
      mutation.reset()
    },
    onChangeAnswer: setAnswer,
    onSubmit: () => mutation.mutate(),
    onReset: () => {
      setAnswer("")
      mutation.reset()
    },
  }
}
