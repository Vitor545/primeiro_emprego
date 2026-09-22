import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { APP_ROUTES } from "@/constants/app-routes"
import { useSignUpForm } from "./hooks/use-sign-up-form"

export function SignUpPage() {
  const { form, isSubmitting, onSubmit } = useSignUpForm()
  const { errors } = form.formState

  return (
    <div className="mx-auto w-full max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>
            Cadastre-se para montar curriculos e acompanhar sua preparacao.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit} noValidate>
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" autoComplete="name" {...form.register("name")} />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                {...form.register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordConfirmation">Confirmar senha</Label>
              <Input
                id="passwordConfirmation"
                type="password"
                autoComplete="new-password"
                {...form.register("passwordConfirmation")}
              />
              {errors.passwordConfirmation && (
                <p className="text-xs text-destructive">{errors.passwordConfirmation.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Criando conta..." : "Criar conta"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Ja tem conta?{" "}
              <Link to={APP_ROUTES.signIn} className="text-foreground underline underline-offset-4">
                Entrar
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
