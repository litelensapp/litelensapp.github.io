import type { FC } from "react"
import heroDemoPoster from "../assets/hero-demo-poster.jpg"
import heroDemoWebm from "../assets/hero-demo.webm"
import heroDemoMp4 from "../assets/hero-demo.mp4"
import { GithubLicenseBadge } from "./badges/GithubLicenseBadge"
import { Section } from "./Section"

export const Hero: FC = () => {
  return (
    <Section>
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        {/* Left Column */}
        <div>
          <h1 className="text-hero mb-4 font-heading text-success">
            A native desktop dashboard for Kubernetes.
          </h1>
          <p className="text-lead mb-6 max-w-lg text-muted-foreground">
            Litelens is a lightweight, native desktop app for managing Kubernetes clusters — a
            clean, modern, watch-based UI over your cluster, without the overhead of Electron.
          </p>
          <GithubLicenseBadge />
        </div>

        {/* Right Column */}
        <div className="overflow-hidden rounded-xl border border-border bg-muted shadow-md">
          <video
            poster={heroDemoPoster}
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
            className="h-auto w-full object-cover"
          >
            <source src={heroDemoWebm} type="video/webm" />
            <source src={heroDemoMp4} type="video/mp4" />
          </video>
        </div>
      </div>
    </Section>
  )
}
