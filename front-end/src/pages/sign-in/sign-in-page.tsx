import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { APP_ROUTES } from "@/constants/app-routes"
import { useSignInForm } from "./hooks/use-sign-in-form"

export function SignInPage() {
  const { form, isSubmitting, onSubmit } = useSignInForm()
  const { errors } = form.formState

  return (
    <div className="mx-auto w-full max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Acesse sua conta para continuar a preparacao.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit} noValidate>
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
                autoComplete="current-password"
                {...form.register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Ainda nao tem conta?{" "}
              <Link to={APP_ROUTES.signUp} className="text-foreground underline underline-offset-4">
                Criar conta
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
