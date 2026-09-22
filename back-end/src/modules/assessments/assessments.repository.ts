import { query } from "../../database/connection.js"
import type { AssessmentAttempt, AssessmentAttemptRecord } from "./assessments.types.js"

const toAttempt = (record: AssessmentAttemptRecord): AssessmentAttempt => ({
  id: record.id,
  userId: record.user_id,
  assessmentSlug: record.assessment_slug,
  score: record.score,
  total: record.total,
  answers: record.answers,
  createdAt: record.created_at.toISOString(),
})

export const assessmentsRepository = {
  async createAttempt(attempt: AssessmentAttempt): Promise<AssessmentAttempt> {
    await query(
      `INSERT INTO assessment_attempts (id, user_id, assessment_slug, score, total, answers, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        attempt.id,
        attempt.userId,
        attempt.assessmentSlug,
        attempt.score,
        attempt.total,
        JSON.stringify(attempt.answers),
        attempt.createdAt,
      ]
    )
    return attempt
  },

  async listByUser(userId: string): Promise<AssessmentAttempt[]> {
    const { rows } = await query<AssessmentAttemptRecord>(
      `SELECT * FROM assessment_attempts WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    )
    return rows.map(toAttempt)
  },

  async listByAssessment(userId: string, assessmentSlug: string): Promise<AssessmentAttempt[]> {
    const { rows } = await query<AssessmentAttemptRecord>(
      `SELECT * FROM assessment_attempts WHERE user_id = $1 AND assessment_slug = $2
       ORDER BY created_at DESC`,
      [userId, assessmentSlug]
    )
    return rows.map(toAttempt)
  },
}
