export const MAX_ATTACHMENT_SIZE_BYTES = 5 * 1024 * 1024

export const ALLOWED_ATTACHMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
] as const
