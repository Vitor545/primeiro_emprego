export interface GuideSection {
  title: string
  content: string
}

export interface Guide {
  slug: string
  title: string
  summary: string
  category: string
  readingMinutes: number
  sections: GuideSection[]
}

export interface GuideSummary {
  slug: string
  title: string
  summary: string
  category: string
  readingMinutes: number
  read: boolean
}
