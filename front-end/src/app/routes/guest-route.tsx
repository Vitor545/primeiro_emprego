import { Navigate, Outlet } from "react-router"

import { APP_ROUTES } from "@/constants/app-routes"
import { useAuth } from "@/hooks/use-auth"

export function GuestRoute() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Navigate to={APP_ROUTES.dashboard} replace /> : <Outlet />
}
