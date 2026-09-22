import { Link } from "react-router"
import { Check, Circle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { ProgressStep } from "@/types/progress"

interface ProgressStepsProps {
  completionPercentage: number
  steps: ProgressStep[]
}

export function ProgressSteps({ completionPercentage, steps }: ProgressStepsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Trilha de preparacao</CardTitle>
        <CardDescription>{completionPercentage}% das etapas concluidas</CardDescription>
        <Progress value={completionPercentage} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step) => (
          <Link
            key={step.id}
            to={step.href}
            className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
          >
            <span
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
                step.done
                  ? "border-primary bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              {step.done ? <Check className="size-3" /> : <Circle className="size-2 fill-current" />}
            </span>
            <span className="space-y-0.5">
              <span
                className={cn(
                  "block text-sm font-medium",
                  step.done && "text-muted-foreground line-through"
                )}
              >
                {step.label}
              </span>
              <span className="block text-xs text-muted-foreground">{step.description}</span>
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
