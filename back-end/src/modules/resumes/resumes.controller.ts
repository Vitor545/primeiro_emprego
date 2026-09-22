import { asyncHandler } from "../../shared/http/async-handler.js"
import { getParam } from "../../shared/http/request-params.js"
import { getUserId } from "../../shared/utils/current-user.js"
import { resumesService } from "./resumes.service.js"
import type { CreateResumeInput, UpdateResumeInput } from "./resumes.schemas.js"

export const resumesController = {
  list: asyncHandler(async (req, res) => {
    res.json(await resumesService.list(getUserId(req)))
  }),

  getById: asyncHandler(async (req, res) => {
    res.json(await resumesService.getById(getParam(req, "id"), getUserId(req)))
  }),

  create: asyncHandler(async (req, res) => {
    res.status(201).json(await resumesService.create(getUserId(req), req.body as CreateResumeInput))
  }),

  update: asyncHandler(async (req, res) => {
    res.json(
      await resumesService.update(getParam(req, "id"), getUserId(req), req.body as UpdateResumeInput)
    )
  }),

  remove: asyncHandler(async (req, res) => {
    await resumesService.remove(getParam(req, "id"), getUserId(req))
    res.status(204).send()
  }),
}
