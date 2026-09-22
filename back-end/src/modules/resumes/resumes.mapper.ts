import type { Resume, ResumeRecord } from "./resumes.types.js"

export const toResume = (record: ResumeRecord): Resume => ({
  id: record.id,
  userId: record.user_id,
  title: record.title,
  content: record.content,
  createdAt: record.created_at.toISOString(),
  updatedAt: record.updated_at.toISOString(),
})
