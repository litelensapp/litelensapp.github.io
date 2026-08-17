import type { FC } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "../App"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 0,
    },
  },
})

const AppWrapper: FC = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)

export default AppWrapper
