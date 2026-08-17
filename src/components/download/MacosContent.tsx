import { TabsContent } from "@litelens/design-system/atoms"
import type { FC } from "react"
import { CodeBlock } from "../CodeBlock"
import { DownloadButton } from "./DownloadButton"

export const MacosContent: FC = () => {
  return (
    <TabsContent value="macos" className="space-y-6">
      <div>
        <h2 className="text-h2 mb-4">Homebrew</h2>
        <CodeBlock
          code={`brew tap litelensapp/homebrew-litelens\nbrew trust litelensapp/litelens/litelens\nbrew install litelens`}
        />
      </div>

      <div>
        <h2 className="text-h2 mb-4">Manual</h2>
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">Run the install script.</p>
          <CodeBlock
            code={`curl -fsSL "https://raw.githubusercontent.com/litelensapp/litelens/main/scripts/install.sh" | bash`}
          />

          <p className="text-xs text-muted-foreground">
            Or click the button below to download the binary directly.
          </p>
          <DownloadButton
            asset="litelens-darwin-arm64.zip"
            label="Download for macOS (Apple Silicon)"
          />
        </div>
      </div>
    </TabsContent>
  )
}
