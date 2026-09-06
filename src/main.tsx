import { createRoot, hydrateRoot } from "react-dom/client"
import "./styles.css"
import { tree } from "./tree.tsx"

const root = document.getElementById("root")!

// Prod builds ship prerendered markup (see plugins/ssg); dev serves an empty
// #root, so there's nothing to hydrate against.
if (root.hasChildNodes()) hydrateRoot(root, tree)
else createRoot(root).render(tree)
