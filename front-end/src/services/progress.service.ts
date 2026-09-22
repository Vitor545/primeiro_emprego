import { httpClient } from "./api/http-client"
import type { ProgressOverview } from "@/types/progress"

export const progressService = {
  overview: () => httpClient<ProgressOverview>("/progress"),
}
