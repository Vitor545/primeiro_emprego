import { AppProviders } from "@/app/providers/app-providers"
import { AppRoutes } from "@/app/routes/app-routes"

export function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  )
}

export default App
