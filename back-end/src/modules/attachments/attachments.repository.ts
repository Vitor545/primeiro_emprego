import { query } from "../../database/connection.js"
import type { Attachment, AttachmentRecord } from "./attachments.types.js"

const toAttachment = (record: AttachmentRecord): Attachment => ({
  id: record.id,
  userId: record.user_id,
  fileName: record.file_name,
  contentType: record.content_type,
  sizeBytes: Number(record.size_bytes),
  storageKey: record.storage_key,
  createdAt: record.created_at.toISOString(),
})

export const attachmentsRepository = {
  async create(attachment: Attachment): Promise<Attachment> {
    await query(
      `INSERT INTO attachments (id, user_id, file_name, content_type, size_bytes, storage_key, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        attachment.id,
        attachment.userId,
        attachment.fileName,
        attachment.contentType,
        attachment.sizeBytes,
        attachment.storageKey,
        attachment.createdAt,
      ]
    )
    return attachment
  },

  async listByUser(userId: string): Promise<Attachment[]> {
    const { rows } = await query<AttachmentRecord>(
      `SELECT * FROM attachments WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    )
    return rows.map(toAttachment)
  },

  async findByIdAndUser(id: string, userId: string): Promise<Attachment | null> {
    const { rows } = await query<AttachmentRecord>(
      `SELECT * FROM attachments WHERE id = $1 AND user_id = $2`,
      [id, userId]
    )
    return rows[0] ? toAttachment(rows[0]) : null
  },

  async remove(id: string, userId: string) {
    await query(`DELETE FROM attachments WHERE id = $1 AND user_id = $2`, [id, userId])
  },
}
