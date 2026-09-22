import cors from "cors"
import express from "express"

import { env } from "./config/env.js"
import { routes } from "./routes/index.js"
import { errorHandler } from "./shared/middlewares/error-handler.js"
import { notFound } from "./shared/middlewares/not-found.js"

export const createApp = () => {
  const app = express()

  app.use(cors({ origin: env.corsOrigin }))
  app.use(express.json())
  app.use("/api", routes)
  app.use(notFound)
  app.use(errorHandler)

  return app
}
