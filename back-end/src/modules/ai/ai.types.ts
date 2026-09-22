export interface ResumeSummaryResult {
  summary: string
  highlights: string[]
  notes: string[]
}

export interface JobMatchResult {
  matchScore: number
  matchedKeywords: string[]
  missingKeywords: string[]
  suggestions: string[]
  verdict: string
}

export interface InterviewFeedbackResult {
  score: number
  star: {
    situation: boolean
    task: boolean
    action: boolean
    result: boolean
  }
  strengths: string[]
  improvements: string[]
  rewrittenAnswer: string
}

export interface CoverLetterResult {
  letter: string
  tips: string[]
}

export type AiInteractionKind =
  | "resume-summary"
  | "job-match"
  | "interview-feedback"
  | "cover-letter"

export interface AiInteraction {
  id: string
  userId: string
  kind: AiInteractionKind
  input: Record<string, unknown>
  output: Record<string, unknown>
  createdAt: string
}

export interface AiInteractionRecord {
  id: string
  user_id: string
  kind: AiInteractionKind
  input: Record<string, unknown>
  output: Record<string, unknown>
  created_at: Date
}
