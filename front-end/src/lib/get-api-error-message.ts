import { ApiError } from "@/services/api/api-error"

export const getApiErrorMessage = (error: unknown, fallback = "Algo deu errado. Tente novamente.") =>
  error instanceof ApiError ? error.message : fallback
