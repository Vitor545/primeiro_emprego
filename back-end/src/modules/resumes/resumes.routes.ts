import { Router } from "express"

import { authenticate } from "../../shared/middlewares/authenticate.js"
import { validateRequest } from "../../shared/middlewares/validate-request.js"
import { resumesController } from "./resumes.controller.js"
import { createResumeSchema, updateResumeSchema } from "./resumes.schemas.js"

export const resumesRoutes = Router()

resumesRoutes.use(authenticate)

resumesRoutes.get("/", resumesController.list)
resumesRoutes.get("/:id", resumesController.getById)
resumesRoutes.post("/", validateRequest(createResumeSchema), resumesController.create)
resumesRoutes.put("/:id", validateRequest(updateResumeSchema), resumesController.update)
resumesRoutes.delete("/:id", resumesController.remove)
