import { Navigate, Outlet, useLocation } from "react-router"

import { APP_ROUTES } from "@/constants/app-routes"
import { useAuth } from "@/hooks/use-auth"

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={APP_ROUTES.signIn} state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}
