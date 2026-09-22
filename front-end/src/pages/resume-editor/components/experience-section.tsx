import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ResumeFormValues } from "../schemas/resume-form-schema"
import { TextField } from "./text-field"

interface ExperienceSectionProps {
  form: UseFormReturn<ResumeFormValues>
  fieldArray: UseFieldArrayReturn<ResumeFormValues, "experiences">
}

const EMPTY_EXPERIENCE = { company: "", role: "", startDate: "", endDate: "", description: "" }

export function ExperienceSection({ form, fieldArray }: ExperienceSectionProps) {
  const errors = form.formState.errors.experiences

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base">Experiencias e projetos</CardTitle>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => fieldArray.append(EMPTY_EXPERIENCE)}
        >
          <Plus className="size-4" />
          Adicionar
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {fieldArray.fields.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Projetos academicos, trabalhos voluntarios e atividades extracurriculares tambem contam.
          </p>
        )}

        {fieldArray.fields.map((field, index) => (
          <div key={field.id} className="space-y-4 rounded-lg border p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id={`experience-company-${index}`}
                label="Empresa ou projeto"
                error={errors?.[index]?.company?.message}
                {...form.register(`experiences.${index}.company`)}
              />
              <TextField
                id={`experience-role-${index}`}
                label="Funcao"
                error={errors?.[index]?.role?.message}
                {...form.register(`experiences.${index}.role`)}
              />
              <TextField
                id={`experience-start-${index}`}
                label="Inicio"
                placeholder="2025"
                error={errors?.[index]?.startDate?.message}
                {...form.register(`experiences.${index}.startDate`)}
              />
              <TextField
                id={`experience-end-${index}`}
                label="Termino"
                placeholder="Atual"
                {...form.register(`experiences.${index}.endDate`)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`experience-description-${index}`}>Principais entregas</Label>
              <Textarea
                id={`experience-description-${index}`}
                rows={3}
                placeholder="Descreva a situacao, a acao tomada e o resultado obtido."
                {...form.register(`experiences.${index}.description`)}
              />
            </div>

            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => fieldArray.remove(index)}
            >
              <Trash2 className="size-4" />
              Remover
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
