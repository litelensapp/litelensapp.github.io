import { createMemoryHistory, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen.ts"

/** Pass `url` for SSR (memory history); omit for the browser (browser history). */
export function createAppRouter(url?: string) {
  return createRouter({
    routeTree,
    history: url ? createMemoryHistory({ initialEntries: [url] }) : undefined,
  })
}

export type AppRouter = ReturnType<typeof createAppRouter>

declare module "@tanstack/react-router" {
  interface Register {
    router: AppRouter
  }
}
