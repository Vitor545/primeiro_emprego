export interface UserRecord {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: Date
}

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: string
}

export interface PublicUser {
  id: string
  name: string
  email: string
  createdAt: string
}
