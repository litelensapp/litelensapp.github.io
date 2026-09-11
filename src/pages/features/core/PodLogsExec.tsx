import type { FC } from "react"
import podLogsDemoPoster from "../../../assets/features/core/pod-logs-demo/pod-logs-demo-poster.jpg"
import podLogsDemoWebm from "../../../assets/features/core/pod-logs-demo/pod-logs-demo.webm"
import podLogsDemoMp4 from "../../../assets/features/core/pod-logs-demo/pod-logs-demo.mp4"

export const PodLogsExec: FC = () => {
  return (
    <section className="bg-background px-6 py-4 md:pt-16 md:pb-16">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[3fr_2fr] md:gap-12">
        {/* Left Column */}
        <div className="order-2 overflow-hidden rounded-xl border border-border bg-muted shadow-md md:order-0">
          <video
            poster={podLogsDemoPoster}
            preload="metadata"
            controls
            muted
            loop
            playsInline
            className="h-auto w-full object-cover"
          >
            <source src={podLogsDemoWebm} type="video/webm" />
            <source src={podLogsDemoMp4} type="video/mp4" />
          </video>
        </div>

        {/* Right Column */}
        <div className="order-1 md:order-0">
          <h1 className="text-hero mb-4 font-heading text-success">
            Stream pod logs and exec straight into a terminal.
          </h1>
          <p className="text-lead max-w-lg text-muted-foreground">
            Tail live logs for any pod without leaving the app, then jump into an interactive exec
            session in the same terminal view — no context switching to kubectl required.
          </p>
        </div>
      </div>
    </section>
  )
}
