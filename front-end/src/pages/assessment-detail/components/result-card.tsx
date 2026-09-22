import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { AssessmentResult } from "@/types/assessment"

interface ResultCardProps {
  result: AssessmentResult
  onRestart: () => void
  onBack: () => void
}

export function ResultCard({ result, onRestart, onBack }: ResultCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Resultado da simulacao</CardDescription>
        <CardTitle className="text-2xl">{result.title}</CardTitle>
        <Progress value={result.percentage} className="mt-3" />
        <p className="text-sm text-muted-foreground">
          {result.attempt.score} de {result.attempt.total} pontos ({result.percentage}%)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed">{result.feedback}</p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onRestart}>
            Refazer
          </Button>
          <Button onClick={onBack}>Voltar aos testes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
