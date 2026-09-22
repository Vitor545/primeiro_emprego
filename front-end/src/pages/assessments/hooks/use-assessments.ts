import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"

import { APP_ROUTES } from "@/constants/app-routes"
import { QUERY_KEYS } from "@/constants/query-keys"
import { assessmentsService } from "@/services/assessments.service"

export const useAssessments = () => {
  const navigate = useNavigate()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.assessments,
    queryFn: assessmentsService.list,
  })

  return {
    assessments: data ?? [],
    isLoading,
    isError,
    refetch,
    onStart: (slug: string) => navigate(APP_ROUTES.assessment(slug)),
  }
}
