import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "sonner"

import { APP_ROUTES, NEW_RESUME_ID } from "@/constants/app-routes"
import { QUERY_KEYS } from "@/constants/query-keys"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { resumesService } from "@/services/resumes.service"

export const useResumes = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.resumes,
    queryFn: resumesService.list,
  })

  const removeMutation = useMutation({
    mutationFn: resumesService.remove,
    onSuccess: () => {
      toast.success("Curriculo excluido")
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.resumes })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.progress })
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })

  return {
    resumes: data ?? [],
    isLoading,
    isError,
    refetch,
    isRemoving: removeMutation.isPending,
    onCreate: () => navigate(APP_ROUTES.resumeEditor(NEW_RESUME_ID)),
    onEdit: (id: string) => navigate(APP_ROUTES.resumeEditor(id)),
    onRemove: (id: string) => removeMutation.mutate(id),
  }
}
