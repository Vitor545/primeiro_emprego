import type { RequestHandler } from "express"

import { HttpError } from "../errors/http-error.js"
import { verifyToken } from "../utils/token.js"

export const authenticate: RequestHandler = (req, _res, next) => {
  const [scheme, token] = req.headers.authorization?.split(" ") ?? []

  if (scheme !== "Bearer" || !token) {
    return next(HttpError.unauthorized("Token nao informado"))
  }

  try {
    req.userId = verifyToken(token).sub
    next()
  } catch {
    next(HttpError.unauthorized("Token invalido ou expirado"))
  }
}
