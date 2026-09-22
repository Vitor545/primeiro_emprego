import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"

import { APP_ROUTES } from "@/constants/app-routes"
import { QUERY_KEYS } from "@/constants/query-keys"
import { guidesService } from "@/services/guides.service"

export const useGuides = () => {
  const navigate = useNavigate()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.guides,
    queryFn: guidesService.list,
  })

  return {
    guides: data ?? [],
    isLoading,
    isError,
    refetch,
    onOpen: (slug: string) => navigate(APP_ROUTES.guide(slug)),
  }
}
