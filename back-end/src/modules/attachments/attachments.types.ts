export interface Attachment {
  id: string
  userId: string
  fileName: string
  contentType: string
  sizeBytes: number
  storageKey: string
  createdAt: string
}

export interface AttachmentRecord {
  id: string
  user_id: string
  file_name: string
  content_type: string
  size_bytes: number
  storage_key: string
  created_at: Date
}

export interface AttachmentWithUrl extends Attachment {
  downloadUrl: string
}
