import type { FC } from "react"
import workloadsDemoPoster from "../../../../assets/features/core/workloads-demo/workloads-demo-poster.jpg"
import workloadsDemoMp4 from "../../../../assets/features/core/workloads-demo/workloads-demo.mp4"
import workloadsDemoWebm from "../../../../assets/features/core/workloads-demo/workloads-demo.webm"
import { FeatureVideoSection } from "./FeatureVideoSection"

export const Workload: FC = () => {
  return (
    <FeatureVideoSection
      reverse
      headingLevel="h1"
      heading="List & detail views for every workload."
      description="Browse Pods, Deployments, DaemonSets, StatefulSets, and more in a live, watch-based list, then drill into any resource for a full detail view — no manual refreshing required."
      poster={workloadsDemoPoster}
      webmSrc={workloadsDemoWebm}
      mp4Src={workloadsDemoMp4}
      width={1600}
      height={1046}
    />
  )
}
