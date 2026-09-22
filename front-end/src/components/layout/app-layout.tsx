import { Outlet } from "react-router"

import { AppHeader } from "./app-header"

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
