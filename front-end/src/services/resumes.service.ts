import { httpClient } from "./api/http-client"
import type { Resume, ResumePayload } from "@/types/resume"

export const resumesService = {
  list: () => httpClient<Resume[]>("/resumes"),

  getById: (id: string) => httpClient<Resume>(`/resumes/${id}`),

  create: (payload: ResumePayload) =>
    httpClient<Resume>("/resumes", { method: "POST", body: payload }),

  update: (id: string, payload: ResumePayload) =>
    httpClient<Resume>(`/resumes/${id}`, { method: "PUT", body: payload }),

  remove: (id: string) => httpClient<void>(`/resumes/${id}`, { method: "DELETE" }),
}
