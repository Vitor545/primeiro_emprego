import { asyncHandler } from "../../shared/http/async-handler.js"
import { getUserId } from "../../shared/utils/current-user.js"
import { progressService } from "./progress.service.js"

export const progressController = {
  overview: asyncHandler((req, res) => {
    res.json(progressService.overview(getUserId(req)))
  }),
}
