import { asyncHandler } from "../../shared/http/async-handler.js"
import { getUserId } from "../../shared/utils/current-user.js"
import { usersService } from "./users.service.js"

export const usersController = {
  profile: asyncHandler((req, res) => {
    res.json(usersService.getProfile(getUserId(req)))
  }),
}
