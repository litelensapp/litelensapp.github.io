import { renderToString } from "react-dom/server"
import { tree } from "./tree.tsx"

export function render(): string {
  return renderToString(tree)
}
