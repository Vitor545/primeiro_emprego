import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocation, useNavigate } from "react-router"
import { toast } from "sonner"

import { APP_ROUTES } from "@/constants/app-routes"
import { useAuth } from "@/hooks/use-auth"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { authService } from "@/services/auth.service"
import { signInSchema, type SignInFormValues } from "../schemas/sign-in-schema"

export const useSignInForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuth()

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  })

  const mutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (session) => {
      signIn(session)
      const redirectTo = (location.state as { from?: string } | null)?.from ?? APP_ROUTES.dashboard
      navigate(redirectTo, { replace: true })
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  })

  return {
    form,
    isSubmitting: mutation.isPending,
    onSubmit: form.handleSubmit((values) => mutation.mutate(values)),
  }
}
