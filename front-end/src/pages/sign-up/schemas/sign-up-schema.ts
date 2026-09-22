import { z } from "zod"

export const signUpSchema = z
  .object({
    name: z.string().trim().min(3, "Informe o nome completo"),
    email: z.string().trim().min(1, "Informe o e-mail").email("E-mail invalido"),
    password: z.string().min(8, "A senha deve ter ao menos 8 caracteres"),
    passwordConfirmation: z.string(),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "As senhas nao conferem",
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>
