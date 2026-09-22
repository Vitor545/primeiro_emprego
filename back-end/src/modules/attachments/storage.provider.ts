import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import { S3ServiceException } from "@aws-sdk/client-s3"

import { env } from "../../config/env.js"
import { HttpError } from "../../shared/errors/http-error.js"

const DOWNLOAD_URL_TTL_SECONDS = 900

let client: S3Client | null = null

const getClient = () => {
  if (!env.storage.enabled) {
    throw new HttpError(503, "Armazenamento indisponivel: configure as variaveis S3_*")
  }

  client ??= new S3Client({
    endpoint: env.storage.endpoint,
    region: env.storage.region,
    forcePathStyle: true,
    // SeaweedFS/MinIO nao aceitam os checksums que o SDK envia por padrao
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
    credentials: {
      accessKeyId: env.storage.accessKey as string,
      secretAccessKey: env.storage.secretKey as string,
    },
  })

  return client
}

const runStorage = async <TResult>(operation: () => Promise<TResult>) => {
  try {
    return await operation()
  } catch (error) {
    if (error instanceof S3ServiceException) {
      const message =
        error.name === "SignatureDoesNotMatch"
          ? "Credenciais de armazenamento rejeitadas. Verifique S3_ACCESS_KEY e S3_SECRET_KEY"
          : `Falha no armazenamento de arquivos: ${error.name}`

      throw new HttpError(502, message)
    }

    throw error
  }
}

export const storageProvider = {
  isEnabled: () => env.storage.enabled,

  async upload(key: string, body: Buffer, contentType: string) {
    await runStorage(() =>
      getClient().send(
        new PutObjectCommand({
          Bucket: env.storage.bucket,
          Key: key,
          Body: body,
          ContentType: contentType,
        })
      )
    )
  },

  async remove(key: string) {
    await runStorage(() =>
      getClient().send(new DeleteObjectCommand({ Bucket: env.storage.bucket, Key: key }))
    )
  },

  createDownloadUrl(key: string, fileName: string) {
    return getSignedUrl(
      getClient(),
      new GetObjectCommand({
        Bucket: env.storage.bucket,
        Key: key,
        ResponseContentDisposition: `attachment; filename="${encodeURIComponent(fileName)}"`,
      }),
      { expiresIn: DOWNLOAD_URL_TTL_SECONDS }
    )
  },
}
