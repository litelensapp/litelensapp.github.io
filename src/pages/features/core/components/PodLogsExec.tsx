import type { FC } from "react"
import podLogsDemoPoster from "../../../../assets/features/core/pod-logs-demo/pod-logs-demo-poster.jpg"
import podLogsDemoMp4 from "../../../../assets/features/core/pod-logs-demo/pod-logs-demo.mp4"
import podLogsDemoWebm from "../../../../assets/features/core/pod-logs-demo/pod-logs-demo.webm"
import { FeatureVideoSection } from "./FeatureVideoSection"

export const PodLogsExec: FC = () => {
  return (
    <FeatureVideoSection
      heading="Stream pod logs and exec straight into a terminal."
      description="Tail live logs for any pod without leaving the app, then jump into an interactive exec session in the same terminal view — no context switching to kubectl required."
      poster={podLogsDemoPoster}
      webmSrc={podLogsDemoWebm}
      mp4Src={podLogsDemoMp4}
    />
  )
}
