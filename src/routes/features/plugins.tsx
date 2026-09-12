import { createFileRoute } from "@tanstack/react-router"
import { PluginsPage } from "../../pages/features/plugins/PluginsPage.tsx"

export const Route = createFileRoute("/features/plugins")({
  component: PluginsPage,
})
