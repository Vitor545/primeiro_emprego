import type { DatabaseSync } from "node:sqlite"

const statements = [
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  );`,

  `CREATE TABLE IF NOT EXISTS resumes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );`,

  `CREATE INDEX IF NOT EXISTS idx_resumes_user ON resumes(user_id);`,

  `CREATE TABLE IF NOT EXISTS assessment_attempts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assessment_slug TEXT NOT NULL,
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    answers TEXT NOT NULL,
    created_at TEXT NOT NULL
  );`,

  `CREATE INDEX IF NOT EXISTS idx_attempts_user ON assessment_attempts(user_id);`,

  `CREATE TABLE IF NOT EXISTS guide_reads (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    guide_slug TEXT NOT NULL,
    read_at TEXT NOT NULL,
    PRIMARY KEY (user_id, guide_slug)
  );`,
]

export const applyMigrations = (database: DatabaseSync) => {
  for (const statement of statements) {
    database.exec(statement)
  }
}
