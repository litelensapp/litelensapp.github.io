import type { FC } from "react"
import pluginsHero from "../../../assets/features/plugins/plugins-hero.png"
import { ImageWithSkeleton } from "../../../components/media/ImageWithSkeleton"

export const Plugins: FC = () => {
  return (
    <section className="bg-background px-6 py-4 md:pt-16 md:pb-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-hero mb-4 font-heading text-success">Extend Litelens with plugins.</h1>
        <p className="text-lead mx-auto max-w-lg text-muted-foreground">
          Add new capabilities to Litelens without waiting on a core release — plugins run alongside
          the host app and plug straight into the same UI you already know.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-xl border border-border shadow-xl transition-transform duration-300 hover:scale-105">
        <ImageWithSkeleton
          src={pluginsHero}
          alt="Litelens plugins"
          className="h-auto w-full object-cover"
        />
      </div>

      <p className="text-lead mx-auto mt-6 max-w-2xl text-center text-muted-foreground">
        Official plugins are served from Litelens's official marketplace — but you're not locked
        into it. Point Litelens at your own custom marketplace to install and manage your own
        plugins.
      </p>
    </section>
  )
}
