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

const findOrFail = async (id: string, userId: string) => {
  const resume = await resumesRepository.findByIdAndUser(id, userId)
  if (!resume) throw HttpError.notFound("Curriculo nao encontrado")

  return resume
}

export const resumesService = {
  async list(userId: string) {
    const resumes = await resumesRepository.listByUser(userId)
    return resumes.map(withAnalysis)
  },

  async getById(id: string, userId: string) {
    return withAnalysis(await findOrFail(id, userId))
  },

  async create(userId: string, input: CreateResumeInput) {
    const now = new Date().toISOString()

    const resume = await resumesRepository.create({
      id: createId(),
      userId,
      title: input.title,
      content: input.content,
      createdAt: now,
      updatedAt: now,
    })

    return withAnalysis(resume)
  },

  async update(id: string, userId: string, input: UpdateResumeInput) {
    const current = await findOrFail(id, userId)

    const resume = await resumesRepository.update({
      ...current,
      title: input.title,
      content: input.content,
      updatedAt: new Date().toISOString(),
    })

    return withAnalysis(resume)
  },

  async remove(id: string, userId: string) {
    await findOrFail(id, userId)
    await resumesRepository.remove(id, userId)
  },
}
