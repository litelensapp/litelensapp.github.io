import { Button } from "@litelens/design-system/atoms"
import { useCopyToClipboard } from "@litelens/design-system/hooks"
import { CheckIcon, CopyIcon } from "lucide-react"
import type { FC } from "react"

interface CodeBlockProps {
  code: string
}

export const CodeBlock: FC<CodeBlockProps> = ({ code }) => {
  const { copiedValue, copy } = useCopyToClipboard()
  const isCopied = copiedValue !== null

  return (
    <div className="flex items-start gap-2 rounded-lg border border-border bg-muted p-4">
      <pre className="min-w-0 flex-1 overflow-x-auto font-mono text-sm text-foreground">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        onClick={() => copy(code)}
        className="h-auto shrink-0 gap-1 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-background hover:text-foreground"
        title="Copy to clipboard"
      >
        {isCopied ? (
          <>
            <CheckIcon className="h-4 w-4" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <CopyIcon className="h-4 w-4" />
            <span>Copy</span>
          </>
        )}
      </Button>
    </div>
  )
}
