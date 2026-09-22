import { Router } from "express"

import { authenticate } from "../../shared/middlewares/authenticate.js"
import { optionalAuthenticate } from "../../shared/middlewares/optional-authenticate.js"
import { guidesController } from "./guides.controller.js"

export const guidesRoutes = Router()

guidesRoutes.get("/", optionalAuthenticate, guidesController.list)
guidesRoutes.get("/:slug", guidesController.getBySlug)
guidesRoutes.post("/:slug/read", authenticate, guidesController.markAsRead)
