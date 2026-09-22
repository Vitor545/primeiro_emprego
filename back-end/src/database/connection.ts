import { mkdirSync } from "node:fs"
import { dirname } from "node:path"
import { DatabaseSync } from "node:sqlite"

import { env } from "../config/env.js"
import { applyMigrations } from "./migrations.js"

mkdirSync(dirname(env.databaseFile), { recursive: true })

export const database = new DatabaseSync(env.databaseFile)

database.exec("PRAGMA journal_mode = WAL;")
database.exec("PRAGMA foreign_keys = ON;")

applyMigrations(database)
