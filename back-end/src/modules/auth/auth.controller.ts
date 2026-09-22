import { asyncHandler } from "../../shared/http/async-handler.js"
import { authService } from "./auth.service.js"
import type { SignInInput, SignUpInput } from "./auth.schemas.js"

export const authController = {
  signUp: asyncHandler(async (req, res) => {
    res.status(201).json(await authService.signUp(req.body as SignUpInput))
  }),

  signIn: asyncHandler(async (req, res) => {
    res.json(await authService.signIn(req.body as SignInInput))
  }),
}
