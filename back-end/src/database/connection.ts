import pg from "pg"

import { env } from "../config/env.js"

const { Pool, types } = pg

types.setTypeParser(types.builtins.INT8, (value) => Number(value))

export const pool = new Pool({ connectionString: env.databaseUrl })

export const query = async <TRow extends pg.QueryResultRow>(text: string, values: unknown[] = []) =>
  pool.query<TRow>(text, values)

export const closeDatabase = () => pool.end()
