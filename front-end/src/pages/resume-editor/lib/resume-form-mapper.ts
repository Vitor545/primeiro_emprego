import type { Resume, ResumePayload } from "@/types/resume"
import type { ResumeFormValues } from "../schemas/resume-form-schema"

const splitList = (value: string) =>
  value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean)

export const EMPTY_RESUME_FORM: ResumeFormValues = {
  title: "Meu curriculo",
  fullName: "",
  role: "",
  email: "",
  phone: "",
  city: "",
  linkedin: "",
  summary: "",
  education: [],
  experiences: [],
  skills: "",
  languages: "",
}

export const toFormValues = (resume: Resume): ResumeFormValues => ({
  title: resume.title,
  fullName: resume.content.fullName,
  role: resume.content.role,
  email: resume.content.email,
  phone: resume.content.phone,
  city: resume.content.city,
  linkedin: resume.content.linkedin,
  summary: resume.content.summary,
  education: resume.content.education,
  experiences: resume.content.experiences,
  skills: resume.content.skills.join(", "),
  languages: resume.content.languages.join(", "),
})

export const toResumePayload = (values: ResumeFormValues): ResumePayload => ({
  title: values.title,
  content: {
    fullName: values.fullName,
    role: values.role,
    email: values.email,
    phone: values.phone,
    city: values.city,
    linkedin: values.linkedin,
    summary: values.summary,
    education: values.education,
    experiences: values.experiences,
    skills: splitList(values.skills),
    languages: splitList(values.languages),
  },
})
