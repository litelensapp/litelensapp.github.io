import { Button, TabsContent } from "@litelens/design-system/atoms"
import { ExternalLinkIcon } from "lucide-react"
import type { FC } from "react"
import { DownloadButton } from "./DownloadButton"

export const WindowsContent: FC = () => {
  return (
    <TabsContent value="windows" className="space-y-4">
      <div>
        <h2 className="text-h2 mb-4">Manual</h2>
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-muted p-4">
            <p className="mb-4 text-sm text-muted-foreground">
              Windows support and prebuilt installers aren't published yet. Check the releases page
              for updates.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                render={
                  <a
                    href={import.meta.env.VITE_APP_RELEASE_BASE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                View on GitHub
                <ExternalLinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Or click the button below to download the binary directly.
          </p>
          <DownloadButton asset="litelens-windows-amd64.exe" label="Download for Windows (amd64)" />
        </div>
      </div>
    </TabsContent>
  )
}
