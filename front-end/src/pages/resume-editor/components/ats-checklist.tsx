import { Check, X } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { AtsAnalysis } from "@/types/resume"

interface AtsChecklistProps {
  analysis: AtsAnalysis
}

export function AtsChecklist({ analysis }: AtsChecklistProps) {
  return (
    <Card className="print:hidden">
      <CardHeader>
        <CardTitle className="text-base">Compatibilidade com ATS</CardTitle>
        <CardDescription>
          {analysis.score}% dos criterios de triagem automatica atendidos
        </CardDescription>
        <Progress value={analysis.score} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-3">
        {analysis.checks.map((check) => (
          <div key={check.id} className="flex items-start gap-2">
            <span
              className={cn(
                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                check.passed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}
            >
              {check.passed ? <Check className="size-3" /> : <X className="size-3" />}
            </span>
            <div className="space-y-0.5">
              <p className="text-sm">{check.label}</p>
              {!check.passed && <p className="text-xs text-muted-foreground">{check.hint}</p>}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
