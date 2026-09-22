import type { RequestHandler } from "express"
import type { ZodTypeAny } from "zod"

type Source = "body" | "params" | "query"

export const validateRequest =
  (schema: ZodTypeAny, source: Source = "body"): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source])

    if (!result.success) {
      return next(result.error)
    }

    Object.assign(req[source], result.data)
    next()
  }
