import { asyncHandler } from "../../shared/http/async-handler.js"
import { getUserId } from "../../shared/utils/current-user.js"
import { progressService } from "./progress.service.js"

export const progressController = {
  overview: asyncHandler(async (req, res) => {
    res.json(await progressService.overview(getUserId(req)))
  }),
}
