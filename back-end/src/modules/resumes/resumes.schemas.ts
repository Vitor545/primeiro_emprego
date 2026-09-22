import { z } from "zod"

const educationSchema = z.object({
  institution: z.string().trim().min(1),
  course: z.string().trim().min(1),
  startDate: z.string().trim().min(1),
  endDate: z.string().trim(),
})

const experienceSchema = z.object({
  company: z.string().trim().min(1),
  role: z.string().trim().min(1),
  startDate: z.string().trim().min(1),
  endDate: z.string().trim(),
  description: z.string().trim(),
})

export const resumeContentSchema = z.object({
  fullName: z.string().trim().min(1, "Informe o nome completo"),
  role: z.string().trim().min(1, "Informe o cargo desejado"),
  email: z.string().trim().email("E-mail invalido"),
  phone: z.string().trim(),
  city: z.string().trim(),
  linkedin: z.string().trim(),
  summary: z.string().trim(),
  education: z.array(educationSchema),
  experiences: z.array(experienceSchema),
  skills: z.array(z.string().trim().min(1)),
  languages: z.array(z.string().trim().min(1)),
})

export const createResumeSchema = z.object({
  title: z.string().trim().min(1, "Informe um titulo"),
  content: resumeContentSchema,
})

export const updateResumeSchema = createResumeSchema

export type CreateResumeInput = z.infer<typeof createResumeSchema>
export type UpdateResumeInput = z.infer<typeof updateResumeSchema>
