import type { Request } from "express"

import { HttpError } from "../errors/http-error.js"

export const getUserId = (req: Request) => {
  if (!req.userId) throw HttpError.unauthorized()
  return req.userId
}
