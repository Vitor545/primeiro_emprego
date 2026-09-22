import { HttpError } from "../../shared/errors/http-error.js"
import { guides } from "./guides.data.js"
import { guidesRepository } from "./guides.repository.js"
import type { Guide, GuideSummary } from "./guides.types.js"

const findOrFail = (slug: string) => {
  const guide = guides.find((item) => item.slug === slug)
  if (!guide) throw HttpError.notFound("Guia nao encontrado")

  return guide
}

const toSummary = (guide: Guide, readSlugs: Set<string>): GuideSummary => ({
  slug: guide.slug,
  title: guide.title,
  summary: guide.summary,
  category: guide.category,
  readingMinutes: guide.readingMinutes,
  read: readSlugs.has(guide.slug),
})

export const guidesService = {
  list(userId?: string): GuideSummary[] {
    const readSlugs = new Set(userId ? guidesRepository.listReadSlugs(userId) : [])
    return guides.map((guide) => toSummary(guide, readSlugs))
  },

  getBySlug(slug: string): Guide {
    return findOrFail(slug)
  },

  markAsRead(userId: string, slug: string) {
    findOrFail(slug)
    guidesRepository.markAsRead(userId, slug)
  },

  countRead(userId: string) {
    return guidesRepository.listReadSlugs(userId).length
  },

  total() {
    return guides.length
  },
}
