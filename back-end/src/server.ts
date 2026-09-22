import { createApp } from "./app.js"
import { env } from "./config/env.js"
import { applyMigrations } from "./database/migrations.js"

const start = async () => {
  await applyMigrations()

  createApp().listen(env.port, () => {
    console.log(`API disponivel em http://localhost:${env.port}/api`)
  })
}

start().catch((error) => {
  console.error("Falha ao iniciar a API:", error)
  process.exit(1)
})
