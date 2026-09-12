import type { FC } from "react"
import portForwardDemoPoster from "../../../../assets/features/core/port-forward-demo/port-forward-demo-poster.jpg"
import portForwardDemoMp4 from "../../../../assets/features/core/port-forward-demo/port-forward-demo.mp4"
import portForwardDemoWebm from "../../../../assets/features/core/port-forward-demo/port-forward-demo.webm"
import { FeatureVideoSection } from "./FeatureVideoSection"

export const PortForward: FC = () => {
  return (
    <FeatureVideoSection
      reverse
      heading="Port-forward to any pod or service in a click."
      description="Start and stop port forwarding straight from a Pod or Service view — no more juggling terminal tabs or remembering kubectl port-forward syntax."
      poster={portForwardDemoPoster}
      webmSrc={portForwardDemoWebm}
      mp4Src={portForwardDemoMp4}
    />
  )
}
