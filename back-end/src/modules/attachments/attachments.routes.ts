import { Router } from "express"
import multer from "multer"

import { authenticate } from "../../shared/middlewares/authenticate.js"
import { attachmentsController } from "./attachments.controller.js"
import { MAX_ATTACHMENT_SIZE_BYTES } from "./attachments.constants.js"

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_ATTACHMENT_SIZE_BYTES },
})

export const attachmentsRoutes = Router()

attachmentsRoutes.get("/status", attachmentsController.status)

attachmentsRoutes.use(authenticate)

attachmentsRoutes.get("/", attachmentsController.list)
attachmentsRoutes.post("/", upload.single("file"), attachmentsController.upload)
attachmentsRoutes.delete("/:id", attachmentsController.remove)
