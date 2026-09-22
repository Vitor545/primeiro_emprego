import { HttpError } from "../../shared/errors/http-error.js"
import { asyncHandler } from "../../shared/http/async-handler.js"
import { getParam } from "../../shared/http/request-params.js"
import { getUserId } from "../../shared/utils/current-user.js"
import { attachmentsService } from "./attachments.service.js"

export const attachmentsController = {
  status: asyncHandler((_req, res) => {
    res.json(attachmentsService.status())
  }),

  list: asyncHandler(async (req, res) => {
    res.json(await attachmentsService.list(getUserId(req)))
  }),

  upload: asyncHandler(async (req, res) => {
    const file = req.file
    if (!file) throw HttpError.badRequest("Envie um arquivo no campo 'file'")

    const attachment = await attachmentsService.upload(getUserId(req), {
      fileName: Buffer.from(file.originalname, "latin1").toString("utf8"),
      contentType: file.mimetype,
      size: file.size,
      buffer: file.buffer,
    })

    res.status(201).json(attachment)
  }),

  remove: asyncHandler(async (req, res) => {
    await attachmentsService.remove(getParam(req, "id"), getUserId(req))
    res.status(204).send()
  }),
}
