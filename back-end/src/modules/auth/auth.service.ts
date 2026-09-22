import { HttpError } from "../../shared/errors/http-error.js"
import { createId } from "../../shared/utils/id.js"
import { hashPassword, verifyPassword } from "../../shared/utils/password.js"
import { signToken } from "../../shared/utils/token.js"
import { toPublicUser } from "../users/users.mapper.js"
import { usersRepository } from "../users/users.repository.js"
import type { SignInInput, SignUpInput } from "./auth.schemas.js"

export const authService = {
  async signUp({ name, email, password }: SignUpInput) {
    if (await usersRepository.findByEmail(email)) {
      throw HttpError.conflict("Ja existe uma conta com este e-mail")
    }

    const user = await usersRepository.create({
      id: createId(),
      name,
      email,
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString(),
    })

    return {
      user: toPublicUser(user),
      token: signToken({ sub: user.id, email: user.email }),
    }
  },

  async signIn({ email, password }: SignInInput) {
    const user = await usersRepository.findByEmail(email)

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      throw HttpError.unauthorized("E-mail ou senha incorretos")
    }

    return {
      user: toPublicUser(user),
      token: signToken({ sub: user.id, email: user.email }),
    }
  },
}
