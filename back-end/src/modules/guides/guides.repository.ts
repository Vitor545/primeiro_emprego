import { database } from "../../database/connection.js"

const upsertStatement = database.prepare(
  `INSERT INTO guide_reads (user_id, guide_slug, read_at) VALUES (?, ?, ?)
   ON CONFLICT(user_id, guide_slug) DO UPDATE SET read_at = excluded.read_at`
)
const listStatement = database.prepare(`SELECT guide_slug FROM guide_reads WHERE user_id = ?`)

export const guidesRepository = {
  markAsRead(userId: string, guideSlug: string) {
    upsertStatement.run(userId, guideSlug, new Date().toISOString())
  },

  listReadSlugs(userId: string): string[] {
    return (listStatement.all(userId) as unknown as Array<{ guide_slug: string }>).map((row) => row.guide_slug)
  },
}
