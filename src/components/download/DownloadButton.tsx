import { Button, DownloadIcon } from "@litelens/design-system/atoms"
import type { FC } from "react"

type DownloadButtonProps = {
  asset: string
  label: string
}

export const DownloadButton: FC<DownloadButtonProps> = ({ asset, label }) => {
  return (
    <Button
      variant="success"
      size="lg"
      nativeButton={false}
      render={<a href={`${import.meta.env.VITE_APP_RELEASE_BASE_URL}/latest/download/${asset}`} />}
    >
      <DownloadIcon />
      {label}
    </Button>
  )
}
