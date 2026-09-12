import { useState, type ComponentPropsWithoutRef, type FC } from "react"
import { cn } from "@litelens/design-system/utils"
import { Skeleton } from "./Skeleton"

export type ImageWithSkeletonProps = ComponentPropsWithoutRef<"img">

// Persists across mounts so a remounted <img> (e.g. inside a dialog that
// unmounts on close) doesn't show a skeleton for a src the browser already
// has cached.
const loadedSrcs = new Set<string>()

export const ImageWithSkeleton: FC<ImageWithSkeletonProps> = ({
  className,
  onLoad,
  alt,
  src,
  ...props
}) => {
  const [loaded, setLoaded] = useState(() => typeof src === "string" && loadedSrcs.has(src))

  const markLoaded = () => {
    if (typeof src === "string") loadedSrcs.add(src)
    setLoaded(true)
  }

  return (
    <div className="relative">
      {!loaded && <Skeleton className="absolute inset-0" />}
      <img
        {...props}
        src={src}
        alt={alt}
        ref={(img) => {
          if (img?.complete) markLoaded()
        }}
        onLoad={(event) => {
          markLoaded()
          onLoad?.(event)
        }}
        className={cn(
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  )
}
