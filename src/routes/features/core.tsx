import { createFileRoute } from "@tanstack/react-router"
import { Divider } from "@litelens/design-system"
import { Workload } from "../../pages/features/core/Workload.tsx"
import { PodLogsExec } from "../../pages/features/core/PodLogsExec.tsx"
import { PortForward } from "../../pages/features/core/PortForward.tsx"
import type { FC } from "react"

const RouteComponent: FC = () => {
  return (
    <>
      <Workload />
      <Divider className="px-6 md:hidden" />
      <PodLogsExec />
      <Divider className="px-6 md:hidden" />
      <PortForward />
    </>
  )
}

export const Route = createFileRoute("/features/core")({
  component: RouteComponent,
})
