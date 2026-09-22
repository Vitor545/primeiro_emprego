import { Router } from "express"

import { authenticate } from "../../shared/middlewares/authenticate.js"
import { progressController } from "./progress.controller.js"

export const progressRoutes = Router()

progressRoutes.get("/", authenticate, progressController.overview)
