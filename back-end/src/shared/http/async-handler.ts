import type { NextFunction, Request, RequestHandler, Response } from "express"

export const asyncHandler =
  (handler: (req: Request, res: Response) => Promise<void> | void): RequestHandler =>
  (req, res, next: NextFunction) => {
    Promise.resolve(handler(req, res)).catch(next)
  }
