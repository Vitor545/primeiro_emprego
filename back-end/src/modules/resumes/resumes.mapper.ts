import type { Resume, ResumeContent, ResumeRecord } from "./resumes.types.js"

export const toResume = (record: ResumeRecord): Resume => ({
  id: record.id,
  userId: record.user_id,
  title: record.title,
  content: JSON.parse(record.content) as ResumeContent,
  createdAt: record.created_at,
  updatedAt: record.updated_at,
})
