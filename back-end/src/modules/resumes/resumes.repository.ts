import { query } from "../../database/connection.js"
import { toResume } from "./resumes.mapper.js"
import type { Resume, ResumeRecord } from "./resumes.types.js"

export const resumesRepository = {
  async create(resume: Resume): Promise<Resume> {
    await query(
      `INSERT INTO resumes (id, user_id, title, content, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        resume.id,
        resume.userId,
        resume.title,
        JSON.stringify(resume.content),
        resume.createdAt,
        resume.updatedAt,
      ]
    )
    return resume
  },

  async update(resume: Resume): Promise<Resume> {
    await query(
      `UPDATE resumes SET title = $1, content = $2, updated_at = $3 WHERE id = $4 AND user_id = $5`,
      [resume.title, JSON.stringify(resume.content), resume.updatedAt, resume.id, resume.userId]
    )
    return resume
  },

  async remove(id: string, userId: string) {
    await query(`DELETE FROM resumes WHERE id = $1 AND user_id = $2`, [id, userId])
  },

  async listByUser(userId: string): Promise<Resume[]> {
    const { rows } = await query<ResumeRecord>(
      `SELECT * FROM resumes WHERE user_id = $1 ORDER BY updated_at DESC`,
      [userId]
    )
    return rows.map(toResume)
  },

  async findByIdAndUser(id: string, userId: string): Promise<Resume | null> {
    const { rows } = await query<ResumeRecord>(
      `SELECT * FROM resumes WHERE id = $1 AND user_id = $2`,
      [id, userId]
    )
    return rows[0] ? toResume(rows[0]) : null
  },
}
