import { ErrorState } from "@/components/feedback/error-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { PageHeader } from "@/components/layout/page-header"
import { MetricCard } from "./components/metric-card"
import { ProgressSteps } from "./components/progress-steps"
import { useDashboard } from "./hooks/use-dashboard"

export function DashboardPage() {
  const { userName, overview, isLoading, isError, refetch } = useDashboard()

  if (isLoading) return <LoadingState />
  if (isError || !overview) {
    return <ErrorState message="Nao foi possivel carregar seu progresso." onRetry={refetch} />
  }

  return (
    <div>
      <PageHeader
        title={`Ola, ${userName.split(" ")[0]}`}
        description="Acompanhe sua preparacao e siga para a proxima etapa."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Curriculos"
          value={String(overview.resumeCount)}
          description="Versoes salvas na sua conta"
        />
        <MetricCard
          label="Compatibilidade ATS"
          value={`${overview.bestAtsScore}%`}
          description="Melhor resultado entre seus curriculos"
        />
        <MetricCard
          label="Simulacoes"
          value={`${overview.assessmentsCompleted}/${overview.assessmentsTotal}`}
          description="Testes comportamentais concluidos"
        />
        <MetricCard
          label="Guias lidos"
          value={`${overview.guidesRead}/${overview.guidesTotal}`}
          description="Conteudos de preparacao estudados"
        />
      </div>

      <div className="mt-6">
        <ProgressSteps
          completionPercentage={overview.completionPercentage}
          steps={overview.steps}
        />
      </div>
    </div>
  )
}
