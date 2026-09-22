import { Router } from "express"

import { authenticate } from "../../shared/middlewares/authenticate.js"
import { validateRequest } from "../../shared/middlewares/validate-request.js"
import { aiController } from "./ai.controller.js"
import {
  coverLetterSchema,
  interviewFeedbackSchema,
  jobMatchSchema,
  resumeSummarySchema,
} from "./ai.schemas.js"

export const aiRoutes = Router()

aiRoutes.get("/status", aiController.status)

aiRoutes.use(authenticate)

aiRoutes.post("/resume-summary", validateRequest(resumeSummarySchema), aiController.resumeSummary)
aiRoutes.post("/job-match", validateRequest(jobMatchSchema), aiController.jobMatch)
aiRoutes.post(
  "/interview-feedback",
  validateRequest(interviewFeedbackSchema),
  aiController.interviewFeedback
)
aiRoutes.post("/cover-letter", validateRequest(coverLetterSchema), aiController.coverLetter)
aiRoutes.get("/history", aiController.history)
