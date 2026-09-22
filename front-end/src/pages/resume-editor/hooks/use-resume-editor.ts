import { useEffect } from "react"
import { useFieldArray, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner"

import { APP_ROUTES, NEW_RESUME_ID } from "@/constants/app-routes"
import { QUERY_KEYS } from "@/constants/query-keys"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { resumesService } from "@/services/resumes.service"
import type { ResumePayload } from "@/types/resume"
import {
  EMPTY_RESUME_FORM,
  toFormValues,
  toResumePayload,
} from "../lib/resume-form-mapper"
import { resumeFormSchema, type ResumeFormValues } from "../schemas/resume-form-schema"

export const useResumeEditor = () => {
  const { id = NEW_RESUME_ID } = useParams()
  const isNew = id === NEW_RESUME_ID
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: EMPTY_RESUME_FORM,
  })

  const formValues = useWatch({ control: form.control })
  const education = useFieldArray({ control: form.control, name: "education" })
  const experiences = useFieldArray({ control: form.control, name: "experiences" })

  const { data: resume, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.resume(id),
    queryFn: () => resumesService.getById(id),
    enabled: !isNew,
  })

  useEffect(() => {
    if (resume) form.reset(toFormValues(resume))
  }, [resume, form])

  const saveMutation = useMutation({
    mutationFn: (payload: ResumePayload) =>
      isNew ? resumesService.create(payload) : resumesService.update(id, payload),
    onSuccess: (saved) => {
      toast.success("Curriculo salvo")
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.resumes })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.progress })
      queryClient.setQueryData(QUERY_KEYS.resume(saved.id), saved)
      if (isNew) navigate(APP_ROUTES.resumeEditor(saved.id), { replace: true })
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })

  return {
    form,
    education,
    experiences,
    isNew,
    isLoading: !isNew && isLoading,
    isError,
    isSaving: saveMutation.isPending,
    ats: resume?.ats ?? null,
    preview: toResumePayload({ ...EMPTY_RESUME_FORM, ...formValues } as ResumeFormValues).content,
    onSubmit: form.handleSubmit((values) => saveMutation.mutate(toResumePayload(values))),
    onPrint: () => window.print(),
    onBack: () => navigate(APP_ROUTES.resumes),
  }
}
