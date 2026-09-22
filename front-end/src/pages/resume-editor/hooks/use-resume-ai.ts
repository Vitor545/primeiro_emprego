import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import type { UseFormReturn } from "react-hook-form"
import { toast } from "sonner"

import { useAiStatus } from "@/hooks/use-ai-status"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { aiService } from "@/services/ai.service"
import type { CoverLetter, JobMatchAnalysis } from "@/types/ai"
import type { ResumeFormValues } from "../schemas/resume-form-schema"

interface UseResumeAiParams {
  resumeId: string | null
  form: UseFormReturn<ResumeFormValues>
}

export const useResumeAi = ({ resumeId, form }: UseResumeAiParams) => {
  const { isAiEnabled } = useAiStatus()
  const [jobDescription, setJobDescription] = useState("")
  const [jobMatch, setJobMatch] = useState<JobMatchAnalysis | null>(null)
  const [coverLetter, setCoverLetter] = useState<CoverLetter | null>(null)

  const requireResume = () => {
    if (!resumeId) {
      toast.error("Salve o curriculo antes de usar a IA")
      return null
    }

    return resumeId
  }

  const summaryMutation = useMutation({
    mutationFn: (id: string) => aiService.resumeSummary(id),
    onSuccess: (result) => {
      form.setValue("summary", result.summary, { shouldDirty: true })
      toast.success("Resumo gerado. Revise antes de salvar.")
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })

  const jobMatchMutation = useMutation({
    mutationFn: (id: string) => aiService.jobMatch(id, jobDescription),
    onSuccess: setJobMatch,
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })

  const coverLetterMutation = useMutation({
    mutationFn: (id: string) => aiService.coverLetter(id, jobDescription),
    onSuccess: setCoverLetter,
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })

  return {
    isAiEnabled,
    jobDescription,
    jobMatch,
    coverLetter,
    isGeneratingSummary: summaryMutation.isPending,
    isAnalyzingJob: jobMatchMutation.isPending,
    isWritingLetter: coverLetterMutation.isPending,
    canAnalyzeJob: jobDescription.trim().length >= 80,
    onChangeJobDescription: setJobDescription,
    onGenerateSummary: () => {
      const id = requireResume()
      if (id) summaryMutation.mutate(id)
    },
    onAnalyzeJob: () => {
      const id = requireResume()
      if (id) jobMatchMutation.mutate(id)
    },
    onWriteCoverLetter: () => {
      const id = requireResume()
      if (id) coverLetterMutation.mutate(id)
    },
  }
}
