import { httpClient } from "./api/http-client"
import type { AuthSession, SignInPayload, SignUpPayload } from "@/types/auth"

export const authService = {
  signIn: (payload: SignInPayload) =>
    httpClient<AuthSession>("/auth/sign-in", { method: "POST", body: payload }),

  signUp: (payload: SignUpPayload) =>
    httpClient<AuthSession>("/auth/sign-up", { method: "POST", body: payload }),
}
