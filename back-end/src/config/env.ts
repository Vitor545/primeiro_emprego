import { resolve } from "node:path"
import process from "node:process"

const toNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const env = {
  port: toNumber(process.env.PORT, 3333),
  nodeEnv: process.env.NODE_ENV ?? "development",
  jwtSecret: process.env.JWT_SECRET ?? "primeiro-emprego-dev-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  databaseFile: resolve(process.cwd(), process.env.DATABASE_FILE ?? "./data/primeiro-emprego.db"),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
} as const
