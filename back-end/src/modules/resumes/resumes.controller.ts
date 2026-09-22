import { asyncHandler } from "../../shared/http/async-handler.js"
import { getUserId } from "../../shared/utils/current-user.js"
import { resumesService } from "./resumes.service.js"
import type { CreateResumeInput, UpdateResumeInput } from "./resumes.schemas.js"
import { getParam } from "../../shared/http/request-params.js"

export const resumesController = {
  list: asyncHandler((req, res) => {
    res.json(resumesService.list(getUserId(req)))
  }),

  getById: asyncHandler((req, res) => {
    res.json(resumesService.getById(getParam(req, "id"), getUserId(req)))
  }),

  create: asyncHandler((req, res) => {
    res.status(201).json(resumesService.create(getUserId(req), req.body as CreateResumeInput))
  }),

  update: asyncHandler((req, res) => {
    res.json(resumesService.update(getParam(req, "id"), getUserId(req), req.body as UpdateResumeInput))
  }),

  remove: asyncHandler((req, res) => {
    resumesService.remove(getParam(req, "id"), getUserId(req))
    res.status(204).send()
  }),
}
