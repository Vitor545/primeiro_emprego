import { Router } from "express"

import { validateRequest } from "../../shared/middlewares/validate-request.js"
import { authController } from "./auth.controller.js"
import { signInSchema, signUpSchema } from "./auth.schemas.js"

export const authRoutes = Router()

authRoutes.post("/sign-up", validateRequest(signUpSchema), authController.signUp)
authRoutes.post("/sign-in", validateRequest(signInSchema), authController.signIn)
