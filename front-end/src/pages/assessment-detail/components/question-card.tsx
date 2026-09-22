import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { AssessmentQuestion } from "@/types/assessment"

interface QuestionCardProps {
  question: AssessmentQuestion
  index: number
  selectedOptionId?: string
  onSelect: (questionId: string, optionId: string) => void
}

export function QuestionCard({ question, index, selectedOptionId, onSelect }: QuestionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          {index + 1}. {question.statement}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(question.id, option.id)}
            className={cn(
              "w-full rounded-lg border p-3 text-left text-sm transition-colors hover:bg-muted/50",
              selectedOptionId === option.id && "border-primary bg-primary/5"
            )}
          >
            {option.label}
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
