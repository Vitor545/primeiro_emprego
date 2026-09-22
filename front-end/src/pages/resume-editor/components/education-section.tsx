import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ResumeFormValues } from "../schemas/resume-form-schema"
import { TextField } from "./text-field"

interface EducationSectionProps {
  form: UseFormReturn<ResumeFormValues>
  fieldArray: UseFieldArrayReturn<ResumeFormValues, "education">
}

const EMPTY_EDUCATION = { institution: "", course: "", startDate: "", endDate: "" }

export function EducationSection({ form, fieldArray }: EducationSectionProps) {
  const errors = form.formState.errors.education

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base">Formacao academica</CardTitle>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => fieldArray.append(EMPTY_EDUCATION)}
        >
          <Plus className="size-4" />
          Adicionar
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {fieldArray.fields.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Inclua ao menos uma formacao: curso tecnico, graduacao ou curso livre relevante.
          </p>
        )}

        {fieldArray.fields.map((field, index) => (
          <div key={field.id} className="space-y-4 rounded-lg border p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id={`education-institution-${index}`}
                label="Instituicao"
                error={errors?.[index]?.institution?.message}
                {...form.register(`education.${index}.institution`)}
              />
              <TextField
                id={`education-course-${index}`}
                label="Curso"
                error={errors?.[index]?.course?.message}
                {...form.register(`education.${index}.course`)}
              />
              <TextField
                id={`education-start-${index}`}
                label="Inicio"
                placeholder="2024"
                error={errors?.[index]?.startDate?.message}
                {...form.register(`education.${index}.startDate`)}
              />
              <TextField
                id={`education-end-${index}`}
                label="Conclusao"
                placeholder="2027 ou Em andamento"
                {...form.register(`education.${index}.endDate`)}
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
