import { ErrorState } from "@/components/feedback/error-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { PageHeader } from "@/components/layout/page-header"
import { AssessmentCard } from "./components/assessment-card"
import { useAssessments } from "./hooks/use-assessments"

export function AssessmentsPage() {
  const { assessments, isLoading, isError, refetch, onStart } = useAssessments()

  return (
    <div>
      <PageHeader
        title="Testes e simulacoes"
        description="Situacoes reais de processo seletivo com diagnostico ao final."
      />

      {isLoading && <LoadingState />}
      {isError && <ErrorState message="Nao foi possivel carregar os testes." onRetry={refetch} />}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assessments.map((assessment) => (
          <AssessmentCard key={assessment.slug} assessment={assessment} onStart={onStart} />
        ))}
      </div>
    </div>
  )
}
