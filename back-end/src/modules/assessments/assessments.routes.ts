import { Router } from "express"

import { authenticate } from "../../shared/middlewares/authenticate.js"
import { validateRequest } from "../../shared/middlewares/validate-request.js"
import { assessmentsController } from "./assessments.controller.js"
import { submitAttemptSchema } from "./assessments.schemas.js"

export const assessmentsRoutes = Router()

assessmentsRoutes.get("/", assessmentsController.list)
assessmentsRoutes.get("/:slug", assessmentsController.getBySlug)
assessmentsRoutes.post(
  "/:slug/attempts",
  authenticate,
  validateRequest(submitAttemptSchema),
  assessmentsController.submit
)
assessmentsRoutes.get("/:slug/attempts", authenticate, assessmentsController.history)
