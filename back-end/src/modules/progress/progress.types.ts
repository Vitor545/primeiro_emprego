export interface ProgressStep {
  id: string
  label: string
  description: string
  done: boolean
  href: string
}

export interface ProgressOverview {
  completionPercentage: number
  resumeCount: number
  bestAtsScore: number
  assessmentsCompleted: number
  assessmentsTotal: number
  guidesRead: number
  guidesTotal: number
  steps: ProgressStep[]
}
