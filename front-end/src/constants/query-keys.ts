export const QUERY_KEYS = {
  profile: ["profile"] as const,
  progress: ["progress"] as const,
  resumes: ["resumes"] as const,
  resume: (id: string) => ["resumes", id] as const,
  assessments: ["assessments"] as const,
  assessment: (slug: string) => ["assessments", slug] as const,
  assessmentHistory: (slug: string) => ["assessments", slug, "attempts"] as const,
  guides: ["guides"] as const,
  guide: (slug: string) => ["guides", slug] as const,
}
