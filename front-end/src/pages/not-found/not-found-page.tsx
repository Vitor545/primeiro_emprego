import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { APP_ROUTES } from "@/constants/app-routes"

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-sm font-medium text-muted-foreground">Erro 404</p>
      <h1 className="text-2xl font-semibold">Pagina nao encontrada</h1>
      <Button render={<Link to={APP_ROUTES.home} />}>Voltar ao inicio</Button>
    </div>
  )
}
