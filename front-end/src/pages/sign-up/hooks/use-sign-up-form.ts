import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { toast } from "sonner"

import { APP_ROUTES } from "@/constants/app-routes"
import { useAuth } from "@/hooks/use-auth"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { authService } from "@/services/auth.service"
import { signUpSchema, type SignUpFormValues } from "../schemas/sign-up-schema"

export const useSignUpForm = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", passwordConfirmation: "" },
  })

  const mutation = useMutation({
    mutationFn: ({ name, email, password }: SignUpFormValues) =>
      authService.signUp({ name, email, password }),
    onSuccess: (session) => {
      signIn(session)
      toast.success("Conta criada com sucesso")
      navigate(APP_ROUTES.dashboard, { replace: true })
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })

  return {
    form,
    isSubmitting: mutation.isPending,
    onSubmit: form.handleSubmit((values) => mutation.mutate(values)),
  }
}
