import process from "node:process"

const required = (key: string) => {
  const value = process.env[key]
  if (!value) throw new Error(`Variavel de ambiente obrigatoria ausente: ${key}`)

  return value
}

const optional = (key: string) => process.env[key]?.trim() || undefined

const toNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const s3Endpoint = optional("S3_ENDPOINT")
const s3AccessKey = optional("S3_ACCESS_KEY")
const s3SecretKey = optional("S3_SECRET_KEY")
const s3Bucket = optional("S3_BUCKET")
const openaiApiKey = optional("OPENAI_API_KEY")

export const env = {
  port: toNumber(process.env.PORT, 3333),
  nodeEnv: process.env.NODE_ENV ?? "development",
  jwtSecret: required("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  databaseUrl: required("DATABASE_URL"),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",

  ai: {
    apiKey: openaiApiKey,
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    enabled: Boolean(openaiApiKey),
  },

  storage: {
    endpoint: s3Endpoint,
    region: process.env.S3_REGION ?? "us-east-1",
    accessKey: s3AccessKey,
    secretKey: s3SecretKey,
    bucket: s3Bucket,
    enabled: Boolean(s3Endpoint && s3AccessKey && s3SecretKey && s3Bucket),
  },
} as const
