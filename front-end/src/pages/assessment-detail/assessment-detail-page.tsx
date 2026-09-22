import { ErrorState } from "@/components/feedback/error-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { QuestionCard } from "./components/question-card"
import { ResultCard } from "./components/result-card"
import { useAssessmentSimulation } from "./hooks/use-assessment-simulation"

export function AssessmentDetailPage() {
  const {
    assessment,
    result,
    answers,
    isLoading,
    isError,
    isSubmitting,
    canSubmit,
    answeredCount,
    questionCount,
    onSelect,
    onSubmit,
    onRestart,
    onBack,
  } = useAssessmentSimulation()

  if (isLoading) return <LoadingState />
  if (isError || !assessment) return <ErrorState message="Teste nao encontrado." />

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={assessment.title} description={assessment.description} />

      {result ? (
        <ResultCard result={result} onRestart={onRestart} onBack={onBack} />
      ) : (
        <div className="space-y-4">
          {assessment.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              selectedOptionId={answers[question.id]}
              onSelect={onSelect}
            />
          ))}

          <div className="flex items-center justify-between gap-4 pt-2">
            <p className="text-sm text-muted-foreground">
              {answeredCount} de {questionCount} respondidas
            </p>
            <Button onClick={onSubmit} disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? "Enviando..." : "Ver resultado"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
