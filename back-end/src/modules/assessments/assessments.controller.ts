import { asyncHandler } from "../../shared/http/async-handler.js"
import { getUserId } from "../../shared/utils/current-user.js"
import { assessmentsService } from "./assessments.service.js"
import type { SubmitAttemptInput } from "./assessments.schemas.js"
import { getParam } from "../../shared/http/request-params.js"

export const assessmentsController = {
  list: asyncHandler((_req, res) => {
    res.json(assessmentsService.list())
  }),

  getBySlug: asyncHandler((req, res) => {
    res.json(assessmentsService.getBySlug(getParam(req, "slug")))
  }),

  submit: asyncHandler(async (req, res) => {
    const result = await assessmentsService.submit(
      getUserId(req),
      getParam(req, "slug"),
      req.body as SubmitAttemptInput
    )
    res.status(201).json(result)
  }),

  history: asyncHandler(async (req, res) => {
    res.json(await assessmentsService.history(getUserId(req), getParam(req, "slug")))
  }),
}
