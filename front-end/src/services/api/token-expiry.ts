interface TokenPayload {
  exp?: number
}

const decodePayload = (token: string): TokenPayload | null => {
  const [, payload] = token.split(".")
  if (!payload) return null

  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/")
    return JSON.parse(atob(normalized)) as TokenPayload
  } catch {
    return null
  }
}

export const isTokenExpired = (token: string | null) => {
  if (!token) return true

  const payload = decodePayload(token)
  if (!payload?.exp) return false

  return payload.exp * 1000 <= Date.now()
}
