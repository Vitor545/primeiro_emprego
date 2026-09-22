import { STORAGE_KEYS } from "@/constants/storage-keys"
import type { AuthSession, AuthUser } from "@/types/auth"

export const authStorage = {
  getToken: () => localStorage.getItem(STORAGE_KEYS.token),

  getUser: (): AuthUser | null => {
    const raw = localStorage.getItem(STORAGE_KEYS.user)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  },

  save: ({ token, user }: AuthSession) => {
    localStorage.setItem(STORAGE_KEYS.token, token)
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.token)
    localStorage.removeItem(STORAGE_KEYS.user)
  },
}
