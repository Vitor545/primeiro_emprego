import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/constants/query-keys"
import { aiService } from "@/services/ai.service"

export const useAiStatus = () => {
  const { data } = useQuery({
    queryKey: QUERY_KEYS.aiStatus,
    queryFn: aiService.status,
    staleTime: Infinity,
  })

  return { isAiEnabled: data?.enabled ?? false, model: data?.model }
}
