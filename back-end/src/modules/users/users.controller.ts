import { asyncHandler } from "../../shared/http/async-handler.js"
import { getUserId } from "../../shared/utils/current-user.js"
import { usersService } from "./users.service.js"

export const usersController = {
  profile: asyncHandler(async (req, res) => {
    res.json(await usersService.getProfile(getUserId(req)))
  }),
}
