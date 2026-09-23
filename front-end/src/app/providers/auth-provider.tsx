import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "sonner"

import { APP_ROUTES } from "@/constants/app-routes"
import { authStorage } from "@/services/api/auth-storage"
import { isTokenExpired } from "@/services/api/token-expiry"
import { setUnauthorizedHandler } from "@/services/api/unauthorized-handler"
import type { AuthSession, AuthUser } from "@/types/auth"
import { AuthContext } from "./auth-context"

const loadStoredUser = (): AuthUser | null => {
  if (isTokenExpired(authStorage.getToken())) {
    authStorage.clear()
    return null
  }

  return authStorage.getUser()
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [user, setUser] = useState<AuthUser | null>(loadStoredUser)

  const signIn = useCallback((session: AuthSession) => {
    authStorage.save(session)
    setUser(session.user)
  }, [])

  const signOut = useCallback(() => {
    authStorage.clear()
    setUser(null)
    queryClient.clear()
  }, [queryClient])

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null)
      queryClient.clear()
      toast.error("Sua sessao expirou. Entre novamente.")
      navigate(APP_ROUTES.signIn, { state: { from: window.location.pathname }, replace: true })
    })

    return () => setUnauthorizedHandler(null)
  }, [navigate, queryClient])

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), signIn, signOut }),
    [user, signIn, signOut]
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
