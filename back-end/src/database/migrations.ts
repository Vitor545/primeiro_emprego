import { query } from "./connection.js"

const statements = [
  `CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );`,

  `CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );`,

  `CREATE INDEX IF NOT EXISTS idx_resumes_user ON resumes(user_id);`,

  `CREATE TABLE IF NOT EXISTS assessment_attempts (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assessment_slug TEXT NOT NULL,
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    answers JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );`,

  `CREATE INDEX IF NOT EXISTS idx_attempts_user ON assessment_attempts(user_id);`,

  `CREATE TABLE IF NOT EXISTS guide_reads (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    guide_slug TEXT NOT NULL,
    read_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, guide_slug)
  );`,

  `CREATE TABLE IF NOT EXISTS attachments (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    content_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    storage_key TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );`,

  `CREATE INDEX IF NOT EXISTS idx_attachments_user ON attachments(user_id);`,

  `CREATE TABLE IF NOT EXISTS ai_interactions (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    kind TEXT NOT NULL,
    input JSONB NOT NULL,
    output JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );`,

  `CREATE INDEX IF NOT EXISTS idx_ai_interactions_user ON ai_interactions(user_id, kind);`,
]

export const applyMigrations = async () => {
  for (const statement of statements) {
    await query(statement)
  }
}
