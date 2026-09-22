import { httpClient } from "./api/http-client"
import type { Guide, GuideSummary } from "@/types/guide"

export const guidesService = {
  list: () => httpClient<GuideSummary[]>("/guides"),

  getBySlug: (slug: string) => httpClient<Guide>(`/guides/${slug}`),

  markAsRead: (slug: string) => httpClient<void>(`/guides/${slug}/read`, { method: "POST" }),
}
