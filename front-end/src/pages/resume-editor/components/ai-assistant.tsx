import { Sparkles, Target, Wand2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import type { CoverLetter, JobMatchAnalysis } from "@/types/ai"

interface AiAssistantProps {
  isAiEnabled: boolean
  jobDescription: string
  jobMatch: JobMatchAnalysis | null
  coverLetter: CoverLetter | null
  isGeneratingSummary: boolean
  isAnalyzingJob: boolean
  isWritingLetter: boolean
  canAnalyzeJob: boolean
  onChangeJobDescription: (value: string) => void
  onGenerateSummary: () => void
  onAnalyzeJob: () => void
  onWriteCoverLetter: () => void
}

export function AiAssistant({
  isAiEnabled,
  jobDescription,
  jobMatch,
  coverLetter,
  isGeneratingSummary,
  isAnalyzingJob,
  isWritingLetter,
  canAnalyzeJob,
  onChangeJobDescription,
  onGenerateSummary,
  onAnalyzeJob,
  onWriteCoverLetter,
}: AiAssistantProps) {
  if (!isAiEnabled) return null

  return (
    <Card className="print:hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="size-4 text-primary" />
          Assistente de IA
        </CardTitle>
        <CardDescription>
          Gere o resumo profissional, compare o curriculo com uma vaga e escreva a carta de
          apresentacao. Revise sempre o texto antes de enviar.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onGenerateSummary}
          disabled={isGeneratingSummary}
        >
          <Wand2 className="size-4" />
          {isGeneratingSummary ? "Gerando resumo..." : "Gerar resumo profissional"}
        </Button>

        <div className="space-y-2 border-t pt-4">
          <p className="text-sm font-medium">Comparar com uma vaga</p>
          <Textarea
            rows={5}
            value={jobDescription}
            placeholder="Cole aqui a descricao completa da vaga (minimo de 80 caracteres)."
            onChange={(event) => onChangeJobDescription(event.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              onClick={onAnalyzeJob}
              disabled={!canAnalyzeJob || isAnalyzingJob}
            >
              <Target className="size-4" />
              {isAnalyzingJob ? "Analisando..." : "Analisar aderencia"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onWriteCoverLetter}
              disabled={!canAnalyzeJob || isWritingLetter}
            >
              {isWritingLetter ? "Escrevendo..." : "Gerar carta de apresentacao"}
            </Button>
          </div>
        </div>

        {jobMatch && (
          <div className="space-y-3 rounded-lg border p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Aderencia a vaga: {jobMatch.matchScore}%</p>
              <Progress value={jobMatch.matchScore} />
              <p className="text-xs text-muted-foreground">{jobMatch.verdict}</p>
            </div>

            {jobMatch.matchedKeywords.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium">Palavras-chave atendidas</p>
                <div className="flex flex-wrap gap-1">
                  {jobMatch.matchedKeywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {jobMatch.missingKeywords.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium">Palavras-chave ausentes</p>
                <div className="flex flex-wrap gap-1">
                  {jobMatch.missingKeywords.map((keyword) => (
                    <Badge key={keyword} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {jobMatch.suggestions.length > 0 && (
              <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                {jobMatch.suggestions.map((suggestion) => (
                  <li key={suggestion}>{suggestion}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {coverLetter && (
          <div className="space-y-2 rounded-lg border p-4">
            <p className="text-sm font-medium">Carta de apresentacao</p>
            <p className="text-sm whitespace-pre-line text-muted-foreground">
              {coverLetter.letter}
            </p>
            {coverLetter.tips.length > 0 && (
              <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                {coverLetter.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
