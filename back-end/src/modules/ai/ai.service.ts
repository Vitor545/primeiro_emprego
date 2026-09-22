import { createId } from "../../shared/utils/id.js"
import { resumesService } from "../resumes/resumes.service.js"
import { aiProvider } from "./ai.provider.js"
import { AI_PROMPTS, describeResume } from "./ai.prompts.js"
import { aiRepository } from "./ai.repository.js"
import type {
  CoverLetterInput,
  InterviewFeedbackInput,
  JobMatchInput,
  ResumeSummaryInput,
} from "./ai.schemas.js"
import type {
  AiInteractionKind,
  CoverLetterResult,
  InterviewFeedbackResult,
  JobMatchResult,
  ResumeSummaryResult,
} from "./ai.types.js"

const record = async <TResult extends object>(
  userId: string,
  kind: AiInteractionKind,
  input: Record<string, unknown>,
  output: TResult
) => {
  await aiRepository.save({
    id: createId(),
    userId,
    kind,
    input,
    output: output as Record<string, unknown>,
    createdAt: new Date().toISOString(),
  })

  return output
}

export const aiService = {
  status: () => ({ enabled: aiProvider.isEnabled(), model: aiProvider.model() }),

  async resumeSummary(userId: string, { resumeId }: ResumeSummaryInput) {
    const resume = await resumesService.getById(resumeId, userId)

    const result = await aiProvider.completeAsJson<ResumeSummaryResult>({
      instructions: AI_PROMPTS.resumeSummary,
      input: describeResume(resume.content),
    })

    return record(userId, "resume-summary", { resumeId }, result)
  },

  async jobMatch(userId: string, { resumeId, jobDescription }: JobMatchInput) {
    const resume = await resumesService.getById(resumeId, userId)

    const result = await aiProvider.completeAsJson<JobMatchResult>({
      instructions: AI_PROMPTS.jobMatch,
      input: `CURRICULO:\n${describeResume(resume.content)}\n\nVAGA:\n${jobDescription}`,
    })

    return record(userId, "job-match", { resumeId, jobDescription }, result)
  },

  async interviewFeedback(userId: string, { question, answer }: InterviewFeedbackInput) {
    const result = await aiProvider.completeAsJson<InterviewFeedbackResult>({
      instructions: AI_PROMPTS.interviewFeedback,
      input: `PERGUNTA:\n${question}\n\nRESPOSTA DO CANDIDATO:\n${answer}`,
    })

    return record(userId, "interview-feedback", { question, answer }, result)
  },

  async coverLetter(userId: string, { resumeId, jobDescription }: CoverLetterInput) {
    const resume = await resumesService.getById(resumeId, userId)

    const result = await aiProvider.completeAsJson<CoverLetterResult>({
      instructions: AI_PROMPTS.coverLetter,
      input: `CURRICULO:\n${describeResume(resume.content)}\n\nVAGA:\n${jobDescription}`,
    })

    return record(userId, "cover-letter", { resumeId, jobDescription }, result)
  },

  history(userId: string, kind?: AiInteractionKind) {
    return aiRepository.listByUser(userId, kind)
  },
}
