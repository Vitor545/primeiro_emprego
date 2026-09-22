import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/constants/query-keys"
import { useAuth } from "@/hooks/use-auth"
import { progressService } from "@/services/progress.service"

export const useDashboard = () => {
  const { user } = useAuth()
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.progress,
    queryFn: progressService.overview,
  })

  return {
    userName: user?.name ?? "",
    overview: data,
    isLoading,
    isError,
    refetch,
  }
}
