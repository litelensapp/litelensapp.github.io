import { Button } from "@litelens/design-system/atoms"
import type { FC } from "react"
import { useGetGithubLicense } from "../../hooks/data-access/useGetGithubLicense"

export const GithubLicenseBadge: FC = () => {
  const { data, isPending } = useGetGithubLicense()
  const spdxId = data?.license?.spdx_id

  return (
    <Button
      size="sm"
      className="h-8 gap-0 overflow-hidden rounded-lg p-0 hover:brightness-95"
      render={
        <a
          href={`${import.meta.env.VITE_APP_GITHUB_URL}/blob/master/LICENSE`}
          target="_blank"
          rel="noopener noreferrer"
        />
      }
    >
      <span className="flex h-full items-center bg-foreground px-3 text-background">LICENSE</span>
      {isPending ? (
        <span className="flex h-full items-center bg-success/85 px-3">
          <span className="h-3 w-14 animate-pulse rounded-full bg-white/50" />
        </span>
      ) : (
        spdxId && (
          <span className="flex h-full items-center bg-success/85 px-3 font-mono text-white">
            {spdxId}
          </span>
        )
      )}
    </Button>
  )
}
