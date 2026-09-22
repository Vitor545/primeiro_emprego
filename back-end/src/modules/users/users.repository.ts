import { database } from "../../database/connection.js"
import { toUser } from "./users.mapper.js"
import type { User, UserRecord } from "./users.types.js"

const insertStatement = database.prepare(
  `INSERT INTO users (id, name, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)`
)
const findByEmailStatement = database.prepare(`SELECT * FROM users WHERE email = ?`)
const findByIdStatement = database.prepare(`SELECT * FROM users WHERE id = ?`)

export const usersRepository = {
  create(user: User): User {
    insertStatement.run(user.id, user.name, user.email, user.passwordHash, user.createdAt)
    return user
  },

  findByEmail(email: string): User | null {
    const record = findByEmailStatement.get(email) as UserRecord | undefined
    return record ? toUser(record) : null
  },

  findById(id: string): User | null {
    const record = findByIdStatement.get(id) as UserRecord | undefined
    return record ? toUser(record) : null
  },
}
