import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { APP_ROUTES } from "@/constants/app-routes"
import { useAuth } from "@/hooks/use-auth"
import { FeatureCard } from "./components/feature-card"
import { HOME_FEATURES } from "./constants/home-features"

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="space-y-14 py-6">
      <section className="mx-auto max-w-3xl space-y-5 text-center">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Preparacao para o primeiro emprego
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Do curriculo a entrevista, em uma trilha so
        </h1>
        <p className="text-muted-foreground text-pretty">
          A plataforma reune a construcao do curriculo no padrao aceito pelos sistemas de triagem, a
          simulacao de situacoes de entrevista e o acompanhamento do seu progresso.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button
            render={<Link to={isAuthenticated ? APP_ROUTES.dashboard : APP_ROUTES.signUp} />}
          >
            {isAuthenticated ? "Ir para o painel" : "Comecar agora"}
          </Button>
          <Button variant="outline" render={<Link to={APP_ROUTES.guides} />}>
            Ver guias
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOME_FEATURES.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
    </div>
  )
}
