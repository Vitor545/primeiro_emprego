export interface AuthUser {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface AuthSession {
  user: AuthUser
  token: string
}

export interface SignInPayload {
  email: string
  password: string
}

export interface SignUpPayload {
  name: string
  email: string
  password: string
}
