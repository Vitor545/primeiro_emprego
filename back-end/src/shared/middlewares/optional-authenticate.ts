import type { RequestHandler } from "express"

import { verifyToken } from "../utils/token.js"

export const optionalAuthenticate: RequestHandler = (req, _res, next) => {
  const [scheme, token] = req.headers.authorization?.split(" ") ?? []

  if (scheme === "Bearer" && token) {
    try {
      req.userId = verifyToken(token).sub
    } catch {
      req.userId = undefined
    }
  }

  next()
}
