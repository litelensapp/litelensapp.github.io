import type { FC } from "react"
import namespaceFilterDemoPoster from "../../../assets/features/core/namespace-filter-demo/namespace-filter-demo-poster.jpg"
import namespaceFilterDemoMp4 from "../../../assets/features/core/namespace-filter-demo/namespace-filter-demo.mp4"
import namespaceFilterDemoWebm from "../../../assets/features/core/namespace-filter-demo/namespace-filter-demo.webm"

export const NamespaceFilter: FC = () => {
  return (
    <section className="bg-background px-6 py-4 md:pt-16 md:pb-16">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[3fr_2fr] md:gap-12">
        {/* Left Column */}
        <div className="order-2 overflow-hidden rounded-xl border border-border bg-muted shadow-md md:order-0">
          <video
            poster={namespaceFilterDemoPoster}
            preload="metadata"
            controls
            muted
            loop
            playsInline
            className="h-auto w-full object-cover"
          >
            <source src={namespaceFilterDemoWebm} type="video/webm" />
            <source src={namespaceFilterDemoMp4} type="video/mp4" />
          </video>
        </div>

        {/* Right Column */}
        <div className="order-1 md:order-0">
          <h1 className="text-hero mb-4 font-heading text-success">
            Filter resources across multiple namespaces at once.
          </h1>
          <p className="text-lead max-w-lg text-muted-foreground">
            Pick any combination of namespaces and every list view narrows down instantly — no more
            switching context one namespace at a time.
          </p>
        </div>
      </div>
    </section>
  )
}
