import { createFileRoute } from "@tanstack/react-router"
import { CoreFeaturesPage } from "../../pages/features/core/CoreFeaturesPage.tsx"

export const Route = createFileRoute("/features/core")({
  component: CoreFeaturesPage,
})
