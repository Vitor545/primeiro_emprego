import type { PublicUser, User, UserRecord } from "./users.types.js"

export const toUser = (record: UserRecord): User => ({
  id: record.id,
  name: record.name,
  email: record.email,
  passwordHash: record.password_hash,
  createdAt: record.created_at,
})

export const toPublicUser = (user: User): PublicUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
})
