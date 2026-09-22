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
  async list(userId?: string): Promise<GuideSummary[]> {
    const readSlugs = new Set(userId ? await guidesRepository.listReadSlugs(userId) : [])
    return guides.map((guide) => toSummary(guide, readSlugs))
  },

  getBySlug(slug: string): Guide {
    return findOrFail(slug)
  },

  async markAsRead(userId: string, slug: string) {
    findOrFail(slug)
    await guidesRepository.markAsRead(userId, slug)
  },

  async countRead(userId: string) {
    const slugs = await guidesRepository.listReadSlugs(userId)
    return slugs.length
  },

  total() {
    return guides.length
  },
}
