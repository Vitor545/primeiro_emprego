import { useCallback, useMemo, useState, type ReactNode } from "react"
import { useQueryClient } from "@tanstack/react-query"

import { authStorage } from "@/services/api/auth-storage"
import type { AuthSession, AuthUser } from "@/types/auth"
import { AuthContext } from "./auth-context"

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const [user, setUser] = useState<AuthUser | null>(() => authStorage.getUser())

  const signIn = useCallback((session: AuthSession) => {
    authStorage.save(session)
    setUser(session.user)
  }, [])

  const signOut = useCallback(() => {
    authStorage.clear()
    setUser(null)
    queryClient.clear()
  }, [queryClient])

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), signIn, signOut }),
    [user, signIn, signOut]
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
