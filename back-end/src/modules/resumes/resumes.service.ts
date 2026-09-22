import { HttpError } from "../../shared/errors/http-error.js"
import { createId } from "../../shared/utils/id.js"
import { atsAnalysisService } from "./ats-analysis.service.js"
import { resumesRepository } from "./resumes.repository.js"
import type { CreateResumeInput, UpdateResumeInput } from "./resumes.schemas.js"
import type { Resume } from "./resumes.types.js"

const withAnalysis = (resume: Resume) => ({
  ...resume,
  ats: atsAnalysisService.analyze(resume.content),
})

const findOrFail = (id: string, userId: string) => {
  const resume = resumesRepository.findByIdAndUser(id, userId)
  if (!resume) throw HttpError.notFound("Curriculo nao encontrado")

  return resume
}

export const resumesService = {
  list(userId: string) {
    return resumesRepository.listByUser(userId).map(withAnalysis)
  },

  getById(id: string, userId: string) {
    return withAnalysis(findOrFail(id, userId))
  },

  create(userId: string, input: CreateResumeInput) {
    const now = new Date().toISOString()

    const resume = resumesRepository.create({
      id: createId(),
      userId,
      title: input.title,
      content: input.content,
      createdAt: now,
      updatedAt: now,
    })

    return withAnalysis(resume)
  },

  update(id: string, userId: string, input: UpdateResumeInput) {
    const current = findOrFail(id, userId)

    const resume = resumesRepository.update({
      ...current,
      title: input.title,
      content: input.content,
      updatedAt: new Date().toISOString(),
    })

    return withAnalysis(resume)
  },

  remove(id: string, userId: string) {
    findOrFail(id, userId)
    resumesRepository.remove(id, userId)
  },
}
