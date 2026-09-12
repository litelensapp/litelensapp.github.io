import type { FC } from "react"
import portForwardDemoPoster from "../../../assets/features/core/port-forward-demo/port-forward-demo-poster.jpg"
import portForwardDemoWebm from "../../../assets/features/core/port-forward-demo/port-forward-demo.webm"
import portForwardDemoMp4 from "../../../assets/features/core/port-forward-demo/port-forward-demo.mp4"

export const PortForward: FC = () => {
  return (
    <section className="bg-background px-6 py-4 md:pt-16 md:pb-16">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        {/* Left Column */}
        <div>
          <h2 className="text-hero mb-4 font-heading text-success">
            Port-forward to any pod or service in a click.
          </h2>
          <p className="text-lead max-w-lg text-muted-foreground">
            Start and stop port forwarding straight from a Pod or Service view — no more juggling
            terminal tabs or remembering kubectl port-forward syntax.
          </p>
        </div>

        {/* Right Column */}
        <div className="overflow-hidden rounded-xl border border-border bg-muted shadow-md">
          <video
            poster={portForwardDemoPoster}
            preload="metadata"
            controls
            muted
            loop
            playsInline
            className="h-auto w-full object-cover"
          >
            <source src={portForwardDemoWebm} type="video/webm" />
            <source src={portForwardDemoMp4} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
