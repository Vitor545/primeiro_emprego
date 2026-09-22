import { Router } from "express"

import { authenticate } from "../../shared/middlewares/authenticate.js"
import { usersController } from "./users.controller.js"

export const usersRoutes = Router()

usersRoutes.get("/me", authenticate, usersController.profile)
