import { createFileRoute } from "@tanstack/react-router"
import { Workload } from "../../pages/features/core/Workload.tsx"
import type { FC } from "react"

const RouteComponent: FC = () => {
  return <Workload />
}

export const Route = createFileRoute("/features/core")({
  component: RouteComponent,
})
