import { QueryClientProvider } from "@tanstack/react-query"
import { StrictMode } from "react"
import { App } from "./App.tsx"
import { queryClient } from "./api/client.ts"

export const tree = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
