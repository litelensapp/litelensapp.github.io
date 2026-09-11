import { renderToString } from "react-dom/server"
import { createAppRouter } from "./router.tsx"
import { createTree } from "./tree.tsx"

export async function render(url: string): Promise<string> {
  const router = createAppRouter(url)
  await router.load()
  return renderToString(createTree(router))
}
