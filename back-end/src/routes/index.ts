import { Router } from "express"

import { aiRoutes } from "../modules/ai/ai.routes.js"
import { assessmentsRoutes } from "../modules/assessments/assessments.routes.js"
import { attachmentsRoutes } from "../modules/attachments/attachments.routes.js"
import { authRoutes } from "../modules/auth/auth.routes.js"
import { guidesRoutes } from "../modules/guides/guides.routes.js"
import { progressRoutes } from "../modules/progress/progress.routes.js"
import { resumesRoutes } from "../modules/resumes/resumes.routes.js"
import { usersRoutes } from "../modules/users/users.routes.js"

export const routes = Router()

routes.get("/health", (_req, res) => {
  res.json({ status: "ok" })
})

routes.use("/auth", authRoutes)
routes.use("/users", usersRoutes)
routes.use("/resumes", resumesRoutes)
routes.use("/assessments", assessmentsRoutes)
routes.use("/guides", guidesRoutes)
routes.use("/progress", progressRoutes)
routes.use("/ai", aiRoutes)
routes.use("/attachments", attachmentsRoutes)
