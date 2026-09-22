import { query } from "../../database/connection.js"
import type { AiInteraction, AiInteractionKind, AiInteractionRecord } from "./ai.types.js"

const toInteraction = (record: AiInteractionRecord): AiInteraction => ({
  id: record.id,
  userId: record.user_id,
  kind: record.kind,
  input: record.input,
  output: record.output,
  createdAt: record.created_at.toISOString(),
})

export const aiRepository = {
  async save(interaction: AiInteraction): Promise<AiInteraction> {
    await query(
      `INSERT INTO ai_interactions (id, user_id, kind, input, output, created_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        interaction.id,
        interaction.userId,
        interaction.kind,
        JSON.stringify(interaction.input),
        JSON.stringify(interaction.output),
        interaction.createdAt,
      ]
    )
    return interaction
  },

  async listByUser(userId: string, kind?: AiInteractionKind): Promise<AiInteraction[]> {
    const { rows } = kind
      ? await query<AiInteractionRecord>(
          `SELECT * FROM ai_interactions WHERE user_id = $1 AND kind = $2
           ORDER BY created_at DESC LIMIT 20`,
          [userId, kind]
        )
      : await query<AiInteractionRecord>(
          `SELECT * FROM ai_interactions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20`,
          [userId]
        )

    return rows.map(toInteraction)
  },
}
