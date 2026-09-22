import { query } from "../../database/connection.js"

export const guidesRepository = {
  async markAsRead(userId: string, guideSlug: string) {
    await query(
      `INSERT INTO guide_reads (user_id, guide_slug, read_at) VALUES ($1, $2, now())
       ON CONFLICT (user_id, guide_slug) DO UPDATE SET read_at = EXCLUDED.read_at`,
      [userId, guideSlug]
    )
  },

  async listReadSlugs(userId: string): Promise<string[]> {
    const { rows } = await query<{ guide_slug: string }>(
      `SELECT guide_slug FROM guide_reads WHERE user_id = $1`,
      [userId]
    )
    return rows.map((row) => row.guide_slug)
  },
}
