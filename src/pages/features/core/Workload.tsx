import type { FC } from "react"
import workloadsDemoPoster from "../../../assets/features/core/workloads-demo/workloads-demo-poster.jpg"
import workloadsDemoWebm from "../../../assets/features/core/workloads-demo/workloads-demo.webm"
import workloadsDemoMp4 from "../../../assets/features/core/workloads-demo/workloads-demo.mp4"
import { VideoWithSkeleton } from "../../../components/media/VideoWithSkeleton"

export const Workload: FC = () => {
  return (
    <section className="bg-background px-6 py-4 md:pt-16 md:pb-16">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        {/* Left Column */}
        <div>
          <h1 className="text-hero mb-4 font-heading text-success">
            List & detail views for every workload.
          </h1>
          <p className="text-lead max-w-lg text-muted-foreground">
            Browse Pods, Deployments, DaemonSets, StatefulSets, and more in a live, watch-based
            list, then drill into any resource for a full detail view — no manual refreshing
            required.
          </p>
        </div>

        {/* Right Column */}
        <div className="overflow-hidden rounded-xl border border-border bg-muted shadow-md">
          <VideoWithSkeleton
            poster={workloadsDemoPoster}
            preload="metadata"
            controls
            muted
            loop
            playsInline
            className="h-auto w-full object-cover"
          >
            <source src={workloadsDemoWebm} type="video/webm" />
            <source src={workloadsDemoMp4} type="video/mp4" />
          </VideoWithSkeleton>
        </div>
      </div>
    </section>
  )
}
