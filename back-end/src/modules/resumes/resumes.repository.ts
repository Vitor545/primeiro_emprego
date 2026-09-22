import { database } from "../../database/connection.js"
import { toResume } from "./resumes.mapper.js"
import type { Resume, ResumeRecord } from "./resumes.types.js"

const insertStatement = database.prepare(
  `INSERT INTO resumes (id, user_id, title, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`
)
const updateStatement = database.prepare(
  `UPDATE resumes SET title = ?, content = ?, updated_at = ? WHERE id = ? AND user_id = ?`
)
const deleteStatement = database.prepare(`DELETE FROM resumes WHERE id = ? AND user_id = ?`)
const listStatement = database.prepare(
  `SELECT * FROM resumes WHERE user_id = ? ORDER BY updated_at DESC`
)
const findStatement = database.prepare(`SELECT * FROM resumes WHERE id = ? AND user_id = ?`)
const countStatement = database.prepare(
  `SELECT COUNT(*) AS total FROM resumes WHERE user_id = ?`
)

export const resumesRepository = {
  create(resume: Resume): Resume {
    insertStatement.run(
      resume.id,
      resume.userId,
      resume.title,
      JSON.stringify(resume.content),
      resume.createdAt,
      resume.updatedAt
    )
    return resume
  },

  update(resume: Resume): Resume {
    updateStatement.run(
      resume.title,
      JSON.stringify(resume.content),
      resume.updatedAt,
      resume.id,
      resume.userId
    )
    return resume
  },

  remove(id: string, userId: string) {
    deleteStatement.run(id, userId)
  },

  listByUser(userId: string): Resume[] {
    return (listStatement.all(userId) as unknown as ResumeRecord[]).map(toResume)
  },

  findByIdAndUser(id: string, userId: string): Resume | null {
    const record = findStatement.get(id, userId) as ResumeRecord | undefined
    return record ? toResume(record) : null
  },

  countByUser(userId: string): number {
    const row = countStatement.get(userId) as { total: number }
    return Number(row.total)
  },
}
