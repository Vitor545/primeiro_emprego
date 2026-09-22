import { Check, X } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { InterviewFeedback } from "@/types/ai"

const STAR_LABELS: Array<{ key: keyof InterviewFeedback["star"]; label: string }> = [
  { key: "situation", label: "Situacao" },
  { key: "task", label: "Tarefa" },
  { key: "action", label: "Acao" },
  { key: "result", label: "Resultado" },
]

export function StarFeedback({ feedback }: { feedback: InterviewFeedback }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Devolutiva da resposta</CardDescription>
        <CardTitle className="text-2xl">{feedback.score}/100</CardTitle>
        <Progress value={feedback.score} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {STAR_LABELS.map(({ key, label }) => (
            <div
              key={key}
              className={cn(
                "flex items-center gap-2 rounded-lg border p-2 text-sm",
                feedback.star[key] ? "border-primary/40" : "text-muted-foreground"
              )}
            >
              {feedback.star[key] ? (
                <Check className="size-4 text-primary" />
              ) : (
                <X className="size-4" />
              )}
              {label}
            </div>
          ))}
        </div>

        {feedback.strengths.length > 0 && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Pontos fortes</p>
            <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {feedback.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {feedback.improvements.length > 0 && (
          <div className="space-y-1">
            <p className="text-sm font-medium">O que melhorar</p>
            <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {feedback.improvements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-1 rounded-lg border p-3">
          <p className="text-sm font-medium">Resposta reescrita</p>
          <p className="text-sm whitespace-pre-line text-muted-foreground">
            {feedback.rewrittenAnswer}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
