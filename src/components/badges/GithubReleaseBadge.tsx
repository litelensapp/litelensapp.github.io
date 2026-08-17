import { Button, GithubIcon } from "@litelens/design-system/atoms"
import type { FC } from "react"
import { useGetGithubLatestRelease } from "../../hooks/data-access/useGetGithubLatestRelease"

export const GithubReleaseBadge: FC = () => {
  const { data, isPending } = useGetGithubLatestRelease()
  const version = data?.tag_name

  return (
    <Button
      size="sm"
      className="h-8 gap-0 overflow-hidden rounded-lg p-0 hover:brightness-95"
      render={
        <a href={import.meta.env.VITE_APP_GITHUB_URL} target="_blank" rel="noopener noreferrer" />
      }
    >
      <span className="flex h-full items-center gap-1.5 bg-foreground px-3 text-background">
        <GithubIcon className="size-4" />
        GITHUB
      </span>
      {isPending ? (
        <span className="flex h-full items-center bg-success/85 px-3">
          <span className="h-3 w-10 animate-pulse rounded-full bg-white/50" />
        </span>
      ) : (
        version && (
          <span className="flex h-full items-center bg-success/85 px-3 font-mono text-white">
            {version}
          </span>
        )
      )}
    </Button>
  )
}
