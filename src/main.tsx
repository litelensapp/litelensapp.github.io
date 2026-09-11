import { createRoot, hydrateRoot } from "react-dom/client"
import "./styles.css"
import { createAppRouter } from "./router.tsx"
import { createTree } from "./tree.tsx"

const router = createAppRouter()
await router.load()
const tree = createTree(router)

const root = document.getElementById("root")!

// Prod builds ship prerendered markup (see plugins/ssg); dev serves an empty
// #root, so there's nothing to hydrate against.
if (root.hasChildNodes()) hydrateRoot(root, tree)
else createRoot(root).render(tree)
