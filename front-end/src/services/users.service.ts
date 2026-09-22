import { httpClient } from "./api/http-client"
import type { AuthUser } from "@/types/auth"

export const usersService = {
  getProfile: () => httpClient<AuthUser>("/users/me"),
}
