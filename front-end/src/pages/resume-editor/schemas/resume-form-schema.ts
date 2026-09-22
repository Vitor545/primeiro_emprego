import { z } from "zod"

const educationSchema = z.object({
  institution: z.string().trim().min(1, "Informe a instituicao"),
  course: z.string().trim().min(1, "Informe o curso"),
  startDate: z.string().trim().min(1, "Informe o inicio"),
  endDate: z.string().trim(),
})

const experienceSchema = z.object({
  company: z.string().trim().min(1, "Informe a empresa ou projeto"),
  role: z.string().trim().min(1, "Informe a funcao"),
  startDate: z.string().trim().min(1, "Informe o inicio"),
  endDate: z.string().trim(),
  description: z.string().trim(),
})

export const resumeFormSchema = z.object({
  title: z.string().trim().min(1, "Informe um titulo para identificar esta versao"),
  fullName: z.string().trim().min(1, "Informe o nome completo"),
  role: z.string().trim().min(1, "Informe o cargo desejado"),
  email: z.string().trim().min(1, "Informe o e-mail").email("E-mail invalido"),
  phone: z.string().trim(),
  city: z.string().trim(),
  linkedin: z.string().trim(),
  summary: z.string().trim(),
  education: z.array(educationSchema),
  experiences: z.array(experienceSchema),
  skills: z.string(),
  languages: z.string(),
})

export type ResumeFormValues = z.infer<typeof resumeFormSchema>
