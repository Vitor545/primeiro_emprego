import { asyncHandler } from "../../shared/http/async-handler.js"
import { guidesService } from "./guides.service.js"
import { getUserId } from "../../shared/utils/current-user.js"
import { getParam } from "../../shared/http/request-params.js"

export const guidesController = {
  list: asyncHandler(async (req, res) => {
    res.json(await guidesService.list(req.userId))
  }),

  getBySlug: asyncHandler((req, res) => {
    res.json(guidesService.getBySlug(getParam(req, "slug")))
  }),

  markAsRead: asyncHandler(async (req, res) => {
    await guidesService.markAsRead(getUserId(req), getParam(req, "slug"))
    res.status(204).send()
  }),
}
