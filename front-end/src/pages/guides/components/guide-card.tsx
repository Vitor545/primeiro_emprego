import { BookOpen, Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { GuideSummary } from "@/types/guide"

interface GuideCardProps {
  guide: GuideSummary
  onOpen: (slug: string) => void
}

export function GuideCard({ guide, onOpen }: GuideCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{guide.category}</Badge>
          {guide.read && (
            <Badge variant="outline" className="gap-1">
              <Check className="size-3" />
              Lido
            </Badge>
          )}
        </div>
        <CardTitle className="text-base">{guide.title}</CardTitle>
        <CardDescription>{guide.summary}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <BookOpen className="size-3.5" />
          {guide.readingMinutes} min de leitura
        </span>
        <Button size="sm" variant="outline" onClick={() => onOpen(guide.slug)}>
          Ler guia
        </Button>
      </CardContent>
    </Card>
  )
}
