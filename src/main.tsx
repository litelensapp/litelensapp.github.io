import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import "./styles.css"
import App from "./App.tsx"

const queryClient = new QueryClient()

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
