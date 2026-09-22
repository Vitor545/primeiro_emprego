import { z } from "zod"

export const signUpSchema = z.object({
  name: z.string().trim().min(3, "Informe o nome completo"),
  email: z.string().trim().toLowerCase().email("E-mail invalido"),
  password: z.string().min(8, "A senha deve ter ao menos 8 caracteres"),
})

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email("E-mail invalido"),
  password: z.string().min(1, "Informe a senha"),
})

export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
