import { closeDatabase } from "./connection.js"
import { applyMigrations } from "./migrations.js"

applyMigrations()
  .then(() => console.log("Migracoes aplicadas."))
  .catch((error) => {
    console.error("Falha ao aplicar as migracoes:", error)
    process.exitCode = 1
  })
  .finally(closeDatabase)
