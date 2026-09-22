import { HttpError } from "../../shared/errors/http-error.js"
import { toPublicUser } from "./users.mapper.js"
import { usersRepository } from "./users.repository.js"

export const usersService = {
  async getProfile(userId: string) {
    const user = await usersRepository.findById(userId)
    if (!user) throw HttpError.notFound("Usuario nao encontrado")

    return toPublicUser(user)
  },
}
