import { extname } from "node:path"

import { HttpError } from "../../shared/errors/http-error.js"
import { createId } from "../../shared/utils/id.js"
import { ALLOWED_ATTACHMENT_TYPES } from "./attachments.constants.js"
import { attachmentsRepository } from "./attachments.repository.js"
import type { AttachmentWithUrl } from "./attachments.types.js"
import { storageProvider } from "./storage.provider.js"

interface UploadInput {
  fileName: string
  contentType: string
  size: number
  buffer: Buffer
}

const assertAllowedType = (contentType: string) => {
  if (!ALLOWED_ATTACHMENT_TYPES.includes(contentType as (typeof ALLOWED_ATTACHMENT_TYPES)[number])) {
    throw HttpError.badRequest("Formato nao suportado. Envie PDF, DOC, DOCX, PNG ou JPG")
  }
}

const findOrFail = async (id: string, userId: string) => {
  const attachment = await attachmentsRepository.findByIdAndUser(id, userId)
  if (!attachment) throw HttpError.notFound("Anexo nao encontrado")

  return attachment
}

export const attachmentsService = {
  status: () => ({ enabled: storageProvider.isEnabled() }),

  async upload(userId: string, file: UploadInput): Promise<AttachmentWithUrl> {
    assertAllowedType(file.contentType)

    const storageKey = `candidatos/${userId}/${createId()}${extname(file.fileName)}`
    await storageProvider.upload(storageKey, file.buffer, file.contentType)

    const attachment = await attachmentsRepository.create({
      id: createId(),
      userId,
      fileName: file.fileName,
      contentType: file.contentType,
      sizeBytes: file.size,
      storageKey,
      createdAt: new Date().toISOString(),
    })

    return {
      ...attachment,
      downloadUrl: await storageProvider.createDownloadUrl(storageKey, attachment.fileName),
    }
  },

  async list(userId: string): Promise<AttachmentWithUrl[]> {
    const attachments = await attachmentsRepository.listByUser(userId)

    return Promise.all(
      attachments.map(async (attachment) => ({
        ...attachment,
        downloadUrl: await storageProvider.createDownloadUrl(
          attachment.storageKey,
          attachment.fileName
        ),
      }))
    )
  },

  async remove(id: string, userId: string) {
    const attachment = await findOrFail(id, userId)

    await storageProvider.remove(attachment.storageKey)
    await attachmentsRepository.remove(id, userId)
  },
}
