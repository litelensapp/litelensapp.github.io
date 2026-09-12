import { Divider } from "@litelens/design-system"
import type { FC } from "react"
import { NamespaceFilter } from "./components/NamespaceFilter.tsx"
import { PodLogsExec } from "./components/PodLogsExec.tsx"
import { PortForward } from "./components/PortForward.tsx"
import { Workload } from "./components/Workload.tsx"

export const CoreFeaturesPage: FC = () => {
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
