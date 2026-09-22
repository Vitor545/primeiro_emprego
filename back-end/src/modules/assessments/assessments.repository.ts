import { database } from "../../database/connection.js"
import type { AssessmentAttempt, AssessmentAttemptRecord } from "./assessments.types.js"

const insertStatement = database.prepare(
  `INSERT INTO assessment_attempts (id, user_id, assessment_slug, score, total, answers, created_at)
   VALUES (?, ?, ?, ?, ?, ?, ?)`
)
const listByUserStatement = database.prepare(
  `SELECT * FROM assessment_attempts WHERE user_id = ? ORDER BY created_at DESC`
)
const listByAssessmentStatement = database.prepare(
  `SELECT * FROM assessment_attempts WHERE user_id = ? AND assessment_slug = ? ORDER BY created_at DESC`
)

const toAttempt = (record: AssessmentAttemptRecord): AssessmentAttempt => ({
  id: record.id,
  userId: record.user_id,
  assessmentSlug: record.assessment_slug,
  score: record.score,
  total: record.total,
  answers: JSON.parse(record.answers) as Record<string, string>,
  createdAt: record.created_at,
})

export const assessmentsRepository = {
  createAttempt(attempt: AssessmentAttempt): AssessmentAttempt {
    insertStatement.run(
      attempt.id,
      attempt.userId,
      attempt.assessmentSlug,
      attempt.score,
      attempt.total,
      JSON.stringify(attempt.answers),
      attempt.createdAt
    )
    return attempt
  },

  listByUser(userId: string): AssessmentAttempt[] {
    return (listByUserStatement.all(userId) as unknown as AssessmentAttemptRecord[]).map(toAttempt)
  },

  listByAssessment(userId: string, assessmentSlug: string): AssessmentAttempt[] {
    return (listByAssessmentStatement.all(userId, assessmentSlug) as unknown as AssessmentAttemptRecord[]).map(
      toAttempt
    )
  },
}
