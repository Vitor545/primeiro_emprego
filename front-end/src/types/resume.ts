export interface ResumeEducation {
  institution: string
  course: string
  startDate: string
  endDate: string
}

export interface ResumeExperience {
  company: string
  role: string
  startDate: string
  endDate: string
  description: string
}

export interface ResumeContent {
  fullName: string
  role: string
  email: string
  phone: string
  city: string
  linkedin: string
  summary: string
  education: ResumeEducation[]
  experiences: ResumeExperience[]
  skills: string[]
  languages: string[]
}

export interface AtsCheck {
  id: string
  label: string
  passed: boolean
  hint: string
}

export interface AtsAnalysis {
  score: number
  checks: AtsCheck[]
}

export interface Resume {
  id: string
  userId: string
  title: string
  content: ResumeContent
  createdAt: string
  updatedAt: string
  ats: AtsAnalysis
}

export interface ResumePayload {
  title: string
  content: ResumeContent
}
