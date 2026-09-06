import type { FC } from "react"
import { DownloadIcon } from "@litelens/design-system/atoms"
import { Key, Zap } from "lucide-react"
import { Section } from "./Section"

export const Prerequisite: FC = () => {
  return (
    <Section id="prerequisite">
      <div className="space-y-8">
        <div>
          <h2 className="text-hero mb-2 font-heading text-foreground">Prerequisite</h2>
          <p className="text-lead text-muted-foreground">
            No setup needed - Litelens is ready to go with zero configuration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-muted p-6">
            <div className="mb-4 flex gap-4">
              <Zap className="size-6 text-success" />
              <h3 className="text-h3 font-heading text-foreground">Zero dependencies</h3>
            </div>
            <p className="text-body text-muted-foreground">
              Single binary with everything included—no runtimes or libraries to install.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted p-6">
            <div className="mb-4 flex gap-4">
              <DownloadIcon className="size-6 text-success" />
              <h3 className="text-h3 font-heading text-foreground">Single file, ~50 MB</h3>
            </div>
            <p className="text-body text-muted-foreground">
              Download once, run anywhere. A self-contained desktop app, no installation wizard.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted p-6">
            <div className="mb-4 flex gap-4">
              <Key className="size-6 text-success" />
              <h3 className="text-h3 font-heading text-foreground">Uses your kubeconfig</h3>
            </div>
            <p className="text-body text-muted-foreground">
              Connects directly to clusters you already use—reads from ~/.kube/config.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
