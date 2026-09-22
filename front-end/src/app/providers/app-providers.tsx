import type { ReactNode } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "./auth-provider"
import { queryClient } from "./query-client"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            {children}
            <Toaster richColors position="top-right" />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
