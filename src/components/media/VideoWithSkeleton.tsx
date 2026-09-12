import { useState, type ComponentPropsWithoutRef, type FC } from "react"
import { cn } from "@litelens/design-system/utils"
import { Skeleton } from "./Skeleton"

export type VideoWithSkeletonProps = ComponentPropsWithoutRef<"video">

export const VideoWithSkeleton: FC<VideoWithSkeletonProps> = ({
  className,
  poster,
  onLoadedData,
  children,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative">
      {!loaded && <Skeleton className="absolute inset-0" />}
      {/* Poster is what's actually shown before playback, so hide the skeleton as soon as it loads
          rather than waiting on the video data (which may not fetch until preload/play). */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="hidden"
          onLoad={() => setLoaded(true)}
        />
      )}
      <video
        {...props}
        poster={poster}
        onLoadedData={(event) => {
          setLoaded(true)
          onLoadedData?.(event)
        }}
        className={cn(
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
      >
        {children}
      </video>
    </div>
  )
}
