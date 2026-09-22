import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ResumeFormValues } from "../schemas/resume-form-schema"
import { EducationSection } from "./education-section"
import { ExperienceSection } from "./experience-section"
import { TextField } from "./text-field"

interface ResumeFormProps {
  form: UseFormReturn<ResumeFormValues>
  education: UseFieldArrayReturn<ResumeFormValues, "education">
  experiences: UseFieldArrayReturn<ResumeFormValues, "experiences">
  onSubmit: () => void
}

export function ResumeForm({ form, education, experiences, onSubmit }: ResumeFormProps) {
  const { errors } = form.formState

  return (
    <form id="resume-form" className="space-y-6" onSubmit={onSubmit} noValidate>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dados principais</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="title"
            label="Titulo desta versao"
            error={errors.title?.message}
            {...form.register("title")}
          />
          <TextField
            id="role"
            label="Cargo desejado"
            placeholder="Estagiario de Desenvolvimento"
            error={errors.role?.message}
            {...form.register("role")}
          />
          <TextField
            id="fullName"
            label="Nome completo"
            error={errors.fullName?.message}
            {...form.register("fullName")}
          />
          <TextField
            id="email"
            label="E-mail"
            type="email"
            error={errors.email?.message}
            {...form.register("email")}
          />
          <TextField id="phone" label="Telefone" {...form.register("phone")} />
          <TextField id="city" label="Cidade e estado" {...form.register("city")} />
          <TextField
            id="linkedin"
            label="LinkedIn ou portfolio"
            placeholder="linkedin.com/in/seu-perfil"
            {...form.register("linkedin")}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resumo profissional</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="summary">Objetivo e area de interesse</Label>
          <Textarea
            id="summary"
            rows={4}
            placeholder="Estudante de ... em busca da primeira oportunidade em ..."
            {...form.register("summary")}
          />
        </CardContent>
      </Card>

      <EducationSection form={form} fieldArray={education} />
      <ExperienceSection form={form} fieldArray={experiences} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Competencias e idiomas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skills">Competencias (separadas por virgula)</Label>
            <Textarea
              id="skills"
              rows={2}
              placeholder="HTML, CSS, JavaScript, Git, Excel"
              {...form.register("skills")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="languages">Idiomas (separados por virgula)</Label>
            <Textarea
              id="languages"
              rows={2}
              placeholder="Portugues nativo, Ingles intermediario"
              {...form.register("languages")}
            />
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
