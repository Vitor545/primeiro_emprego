export interface Attachment {
  id: string
  fileName: string
  contentType: string
  sizeBytes: number
  createdAt: string
  downloadUrl: string
}

export interface StorageStatus {
  enabled: boolean
}
