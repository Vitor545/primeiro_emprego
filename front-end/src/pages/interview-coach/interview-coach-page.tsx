import { EmptyState } from "@/components/feedback/empty-state"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { StarFeedback } from "./components/star-feedback"
import { useInterviewCoach } from "./hooks/use-interview-coach"

export function InterviewCoachPage() {
  const {
    isAiEnabled,
    questions,
    question,
    answer,
    feedback,
    isSubmitting,
    canSubmit,
    onSelectQuestion,
    onChangeAnswer,
    onSubmit,
    onReset,
  } = useInterviewCoach()

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Treino de entrevista"
        description="Escreva sua resposta e receba uma devolutiva estruturada pela tecnica STAR."
      />

      {!isAiEnabled ? (
        <EmptyState
          title="Recurso indisponivel"
          description="O treino de entrevista depende da integracao de inteligencia artificial, que nao esta configurada neste ambiente."
        />
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Escolha a pergunta</CardTitle>
              <CardDescription>Perguntas frequentes em processos de primeiro emprego.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {questions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSelectQuestion(item)}
                  className={cn(
                    "w-full rounded-lg border p-3 text-left text-sm transition-colors hover:bg-muted/50",
                    question === item && "border-primary bg-primary/5"
                  )}
                >
                  {item}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sua resposta</CardTitle>
              <CardDescription>
                Descreva a situacao, o que precisava ser feito, a acao tomada e o resultado.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                rows={8}
                value={answer}
                placeholder="Escreva como se estivesse respondendo ao recrutador."
                onChange={(event) => onChangeAnswer(event.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={onSubmit} disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? "Analisando..." : "Receber devolutiva"}
                </Button>
                <Button variant="ghost" onClick={onReset} disabled={isSubmitting}>
                  Limpar
                </Button>
              </div>
            </CardContent>
          </Card>

          {feedback && <StarFeedback feedback={feedback} />}
        </div>
      )}
    </div>
  )
}
