import type { FC } from "react"
import { VideoWithSkeleton } from "../../../../components/media/VideoWithSkeleton"

export type FeatureVideoSectionProps = {
  heading: string
  headingLevel?: "h1" | "h2"
  description: string
  poster: string
  webmSrc: string
  mp4Src: string
  /** Intrinsic dimensions of `poster` (i.e. the video's own frame size), so the skeleton
   * reserves the right aspect ratio before the video or poster has loaded. */
  width: number
  height: number
  /** Puts text in the larger `3fr` column on the left and video in the `2fr` column on the
   * right, instead of the default video-left/text-right layout. Mobile always stacks text
   * before video either way. */
  reverse?: boolean
}

const TextColumn: FC<
  Pick<FeatureVideoSectionProps, "heading" | "headingLevel" | "description"> & {
    className?: string
  }
> = ({ heading, headingLevel: Heading = "h2", description, className }) => (
  <div className={className}>
    <Heading className="text-hero mb-4 font-heading text-success">{heading}</Heading>
    <p className="text-lead max-w-lg text-muted-foreground">{description}</p>
  </div>
)

const VideoColumn: FC<
  Pick<FeatureVideoSectionProps, "poster" | "webmSrc" | "mp4Src" | "width" | "height"> & {
    className?: string
  }
> = ({ poster, webmSrc, mp4Src, width, height, className }) => (
  <div className={className}>
    <VideoWithSkeleton
      poster={poster}
      preload="metadata"
      controls
      muted
      loop
      playsInline
      width={width}
      height={height}
      className="h-auto w-full object-cover"
    >
      <source src={webmSrc} type="video/webm" />
      <source src={mp4Src} type="video/mp4" />
    </VideoWithSkeleton>
  </div>
)

/** Feature-demo layout: a looping video alongside a heading/description, stacking with text
 * first on mobile either way. Set `reverse` to put the text in the larger column on the left
 * and the video on the right, instead of the default video-left/text-right layout. */
export const FeatureVideoSection: FC<FeatureVideoSectionProps> = ({
  heading,
  headingLevel,
  description,
  poster,
  webmSrc,
  mp4Src,
  width,
  height,
  reverse = false,
}) => {
  return (
    <section className="bg-background px-6 py-4 md:pt-16 md:pb-16">
      <div
        className={
          reverse
            ? "grid grid-cols-1 items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-12"
            : "grid grid-cols-1 items-center gap-8 md:grid-cols-[3fr_2fr] md:gap-12"
        }
      >
        {reverse ? (
          <>
            <TextColumn heading={heading} headingLevel={headingLevel} description={description} />
            <VideoColumn
              poster={poster}
              webmSrc={webmSrc}
              mp4Src={mp4Src}
              width={width}
              height={height}
              className="overflow-hidden rounded-xl border border-border bg-muted shadow-md"
            />
          </>
        ) : (
          <>
            <VideoColumn
              poster={poster}
              webmSrc={webmSrc}
              mp4Src={mp4Src}
              width={width}
              height={height}
              className="order-2 overflow-hidden rounded-xl border border-border bg-muted shadow-md md:order-0"
            />
            <TextColumn
              heading={heading}
              headingLevel={headingLevel}
              description={description}
              className="order-1 md:order-0"
            />
          </>
        )}
      </div>
    </section>
  )
}
