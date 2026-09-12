import { createFileRoute } from "@tanstack/react-router"
import type { FC } from "react"
import { Plugins } from "../../pages/features/plugins/Plugins.tsx"

const RouteComponent: FC = () => {
  return <Plugins />
}

export const Route = createFileRoute("/features/plugins")({
  component: RouteComponent,
})
