import type { FC } from "react"
import namespaceFilterDemoPoster from "../../../../assets/features/core/namespace-filter-demo/namespace-filter-demo-poster.jpg"
import namespaceFilterDemoMp4 from "../../../../assets/features/core/namespace-filter-demo/namespace-filter-demo.mp4"
import namespaceFilterDemoWebm from "../../../../assets/features/core/namespace-filter-demo/namespace-filter-demo.webm"
import { FeatureVideoSection } from "./FeatureVideoSection"

export const NamespaceFilter: FC = () => {
  return (
    <FeatureVideoSection
      heading="Filter resources across multiple namespaces at once."
      description="Pick any combination of namespaces and every list view narrows down instantly — no more switching context one namespace at a time."
      poster={namespaceFilterDemoPoster}
      webmSrc={namespaceFilterDemoWebm}
      mp4Src={namespaceFilterDemoMp4}
      width={1600}
      height={1046}
    />
  )
}
