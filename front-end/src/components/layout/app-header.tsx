import { Link, NavLink } from "react-router"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { APP_ROUTES } from "@/constants/app-routes"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { to: APP_ROUTES.dashboard, label: "Painel" },
  { to: APP_ROUTES.resumes, label: "Curriculos" },
  { to: APP_ROUTES.assessments, label: "Testes" },
  { to: APP_ROUTES.interviewCoach, label: "Treino" },
  { to: APP_ROUTES.guides, label: "Guias" },
  { to: APP_ROUTES.attachments, label: "Documentos" },
]

export function AppHeader() {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur print:hidden">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-4">
        <Link to={APP_ROUTES.home} className="text-sm font-semibold tracking-tight">
          Primeiro Emprego
        </Link>

        {isAuthenticated && (
          <nav className="hidden items-center gap-1 sm:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    isActive && "bg-muted font-medium text-foreground"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-muted-foreground sm:inline">{user?.name}</span>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="size-4" />
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" render={<Link to={APP_ROUTES.signIn} />}>
                Entrar
              </Button>
              <Button size="sm" render={<Link to={APP_ROUTES.signUp} />}>
                Criar conta
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
