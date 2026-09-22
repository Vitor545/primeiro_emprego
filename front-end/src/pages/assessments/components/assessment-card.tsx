import { Clock, ListChecks } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AssessmentSummary } from "@/types/assessment"

interface AssessmentCardProps {
  assessment: AssessmentSummary
  onStart: (slug: string) => void
}

export function AssessmentCard({ assessment, onStart }: AssessmentCardProps) {
  return (
    <Card>
      <CardHeader>
        <Badge variant="secondary" className="w-fit">
          {assessment.category}
        </Badge>
        <CardTitle className="text-base">{assessment.title}</CardTitle>
        <CardDescription>{assessment.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {assessment.durationMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <ListChecks className="size-3.5" />
            {assessment.questionCount} questoes
          </span>
        </div>
        <Button size="sm" onClick={() => onStart(assessment.slug)}>
          Iniciar simulacao
        </Button>
      </CardContent>
    </Card>
  )
}
