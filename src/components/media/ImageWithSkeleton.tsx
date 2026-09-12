import { useState, type ComponentPropsWithoutRef, type FC } from "react"
import { cn } from "@litelens/design-system/utils"
import { Skeleton } from "./Skeleton"

export type ImageWithSkeletonProps = ComponentPropsWithoutRef<"img">

export const ImageWithSkeleton: FC<ImageWithSkeletonProps> = ({
  className,
  onLoad,
  alt,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative">
      {!loaded && <Skeleton className="absolute inset-0" />}
      <img
        {...props}
        alt={alt}
        onLoad={(event) => {
          setLoaded(true)
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
