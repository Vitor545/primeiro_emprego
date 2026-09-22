import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner"

import { APP_ROUTES } from "@/constants/app-routes"
import { QUERY_KEYS } from "@/constants/query-keys"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { guidesService } from "@/services/guides.service"

export const useGuideDetail = () => {
  const { slug = "" } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: guide, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.guide(slug),
    queryFn: () => guidesService.getBySlug(slug),
    enabled: Boolean(slug),
  })

  const markAsReadMutation = useMutation({
    mutationFn: () => guidesService.markAsRead(slug),
    onSuccess: () => {
      toast.success("Guia marcado como lido")
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.guides })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.progress })
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })

  return {
    guide,
    isLoading,
    isError,
    isMarking: markAsReadMutation.isPending,
    onMarkAsRead: () => markAsReadMutation.mutate(),
    onBack: () => navigate(APP_ROUTES.guides),
  }
}
