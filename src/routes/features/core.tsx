import { Divider } from "@litelens/design-system"
import { createFileRoute } from "@tanstack/react-router"
import type { FC } from "react"
import { NamespaceFilter } from "../../pages/features/core/NamespaceFilter.tsx"
import { PodLogsExec } from "../../pages/features/core/PodLogsExec.tsx"
import { PortForward } from "../../pages/features/core/PortForward.tsx"
import { Workload } from "../../pages/features/core/Workload.tsx"

const RouteComponent: FC = () => {
  return (
    <>
      <Workload />
      <Divider className="px-6 md:hidden" />
      <PodLogsExec />
      <Divider className="px-6 md:hidden" />
      <PortForward />
      <Divider className="px-6 md:hidden" />
      <NamespaceFilter />
    </>
  )
}

export const Route = createFileRoute("/features/core")({
  component: RouteComponent,
})
