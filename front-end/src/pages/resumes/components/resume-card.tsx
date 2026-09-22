import { Pencil, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatDateTime } from "@/lib/format-date"
import type { Resume } from "@/types/resume"

interface ResumeCardProps {
  resume: Resume
  isRemoving: boolean
  onEdit: (id: string) => void
  onRemove: (id: string) => void
}

export function ResumeCard({ resume, isRemoving, onEdit, onRemove }: ResumeCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-base">{resume.title}</CardTitle>
            <CardDescription>
              {resume.content.role || "Cargo nao informado"} - atualizado em{" "}
              {formatDateTime(resume.updatedAt)}
            </CardDescription>
          </div>
          <Badge variant={resume.ats.score >= 80 ? "default" : "secondary"}>
            ATS {resume.ats.score}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={resume.ats.score} />
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(resume.id)}>
            <Pencil className="size-4" />
            Editar
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={isRemoving}
            onClick={() => onRemove(resume.id)}
          >
            <Trash2 className="size-4" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
