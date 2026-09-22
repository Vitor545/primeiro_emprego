export interface AiStatus {
  enabled: boolean
  model: string
}

export interface ResumeSummarySuggestion {
  summary: string
  highlights: string[]
  notes: string[]
}

export interface JobMatchAnalysis {
  matchScore: number
  matchedKeywords: string[]
  missingKeywords: string[]
  suggestions: string[]
  verdict: string
}

export interface InterviewFeedback {
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

export interface CoverLetter {
  letter: string
  tips: string[]
}
