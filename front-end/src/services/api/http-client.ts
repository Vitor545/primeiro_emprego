import type { ApiErrorResponse } from "@/types/api"
import { ApiError } from "./api-error"
import { authStorage } from "./auth-storage"

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333/api"

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: unknown
}

const buildHeaders = (isJsonBody: boolean) => {
  const headers = new Headers()
  const token = authStorage.getToken()

  if (isJsonBody) headers.set("Content-Type", "application/json")
  if (token) headers.set("Authorization", `Bearer ${token}`)

  return headers
}

export const httpClient = async <TResponse>(
  path: string,
  { method = "GET", body }: RequestOptions = {}
): Promise<TResponse> => {
  const isFormData = body instanceof FormData

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: buildHeaders(body !== undefined && !isFormData),
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
  })

  if (response.status === 204) return undefined as TResponse

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const error = (data ?? {}) as ApiErrorResponse
    throw new ApiError(response.status, error.message ?? "Nao foi possivel completar a requisicao", error.details)
  }

  return data as TResponse
}
