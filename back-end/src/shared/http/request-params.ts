import type { Request } from "express"

export const getParam = (req: Request, key: string) => String(req.params[key])
