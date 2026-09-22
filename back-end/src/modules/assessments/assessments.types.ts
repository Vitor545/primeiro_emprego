export interface AssessmentOption {
  id: string
  label: string
  score: number
}

export interface AssessmentQuestion {
  id: string
  statement: string
  options: AssessmentOption[]
}

export interface AssessmentResultRange {
  minPercentage: number
  title: string
  feedback: string
}

export interface Assessment {
  slug: string
  title: string
  description: string
  category: string
  durationMinutes: number
  questions: AssessmentQuestion[]
  resultRanges: AssessmentResultRange[]
}

export interface AssessmentSummary {
  slug: string
  title: string
  description: string
  category: string
  durationMinutes: number
  questionCount: number
}

export interface AssessmentAttempt {
  id: string
  userId: string
  assessmentSlug: string
  score: number
  total: number
  answers: Record<string, string>
  createdAt: string
}

export interface AssessmentAttemptRecord {
  id: string
  user_id: string
  assessment_slug: string
  score: number
  total: number
  answers: Record<string, string>
  created_at: Date
}

export interface AssessmentResult {
  attempt: AssessmentAttempt
  percentage: number
  title: string
  feedback: string
}
