import { asyncHandler } from "../../shared/http/async-handler.js"
import { getUserId } from "../../shared/utils/current-user.js"
import { aiService } from "./ai.service.js"
import type {
  CoverLetterInput,
  InterviewFeedbackInput,
  JobMatchInput,
  ResumeSummaryInput,
} from "./ai.schemas.js"
import type { AiInteractionKind } from "./ai.types.js"

export const aiController = {
  status: asyncHandler((_req, res) => {
    res.json(aiService.status())
  }),

  resumeSummary: asyncHandler(async (req, res) => {
    res.json(await aiService.resumeSummary(getUserId(req), req.body as ResumeSummaryInput))
  }),

  jobMatch: asyncHandler(async (req, res) => {
    res.json(await aiService.jobMatch(getUserId(req), req.body as JobMatchInput))
  }),

  interviewFeedback: asyncHandler(async (req, res) => {
    res.json(await aiService.interviewFeedback(getUserId(req), req.body as InterviewFeedbackInput))
  }),

  coverLetter: asyncHandler(async (req, res) => {
    res.json(await aiService.coverLetter(getUserId(req), req.body as CoverLetterInput))
  }),

  history: asyncHandler(async (req, res) => {
    const kind = req.query.kind as AiInteractionKind | undefined
    res.json(await aiService.history(getUserId(req), kind))
  }),
}
