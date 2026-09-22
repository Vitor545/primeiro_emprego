import { query } from "../../database/connection.js"
import { toUser } from "./users.mapper.js"
import type { User, UserRecord } from "./users.types.js"

export const usersRepository = {
  async create(user: User): Promise<User> {
    await query(
      `INSERT INTO users (id, name, email, password_hash, created_at) VALUES ($1, $2, $3, $4, $5)`,
      [user.id, user.name, user.email, user.passwordHash, user.createdAt]
    )
    return user
  },

  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await query<UserRecord>(`SELECT * FROM users WHERE email = $1`, [email])
    return rows[0] ? toUser(rows[0]) : null
  },

  async findById(id: string): Promise<User | null> {
    const { rows } = await query<UserRecord>(`SELECT * FROM users WHERE id = $1`, [id])
    return rows[0] ? toUser(rows[0]) : null
  },
}
