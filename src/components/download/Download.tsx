import {
  AppleIcon,
  LinuxIcon,
  Tabs,
  TabsList,
  TabsTrigger,
  WindowsIcon,
} from "@litelens/design-system/atoms"
import { useBreakpoint } from "@litelens/design-system/hooks"
import { cn } from "@litelens/design-system/utils"
import type { FC, SVGProps } from "react"
import { Section } from "../Section"
import { LinuxContent } from "./LinuxContent"
import { MacosContent } from "./MacosContent"
import { WindowsContent } from "./WindowsContent"

const PLATFORMS = { macos: "macos", linux: "linux", windows: "windows" } as const
type PlatformType = (typeof PLATFORMS)[keyof typeof PLATFORMS]

const PLATFORM_TABS: { value: PlatformType; label: string; icon: FC<SVGProps<SVGSVGElement>> }[] = [
  {
    value: "macos",
    label: "MacOS",
    icon: AppleIcon,
  },
  {
    value: "linux",
    label: "Linux",
    icon: LinuxIcon,
  },
  {
    value: "windows",
    label: "Windows",
    icon: WindowsIcon,
  },
]

export const Download: FC = () => {
  const isDesktop = useBreakpoint("md")
  return (
    <Section paddingBotton id="installation">
      <h2 className="text-hero mb-2 font-heading text-foreground">Installation</h2>
      <p className="text-lead mb-8 text-muted-foreground">Choose your platform</p>

      <Tabs
        defaultValue={PLATFORMS.macos}
        orientation={isDesktop ? "vertical" : "horizontal"}
        className="w-full data-vertical:grid-cols-1"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr]">
          {/* Left column: Platform tabs */}
          <TabsList
            variant="line"
            className="w-full justify-start gap-2 pr-0.5 md:justify-center"
            indicatorClassName="hidden"
          >
            {PLATFORM_TABS.map((platform) => (
              <TabsTrigger
                key={platform.value}
                value={platform.value}
                className={cn(
                  "h-12 flex-none items-center gap-2 rounded-lg text-sm font-semibold not-data-active:hover:bg-muted",
                  "data-active:bg-success data-active:text-white data-active:hover:bg-success/90 data-active:hover:text-white",
                  "min-w-24 rounded-t-lg rounded-b-none",
                  "md:min-w-32 md:rounded-l-lg md:rounded-r-none md:pl-4"
                )}
              >
                <platform.icon className="size-4 shrink-0" />
                {platform.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Right column: Content panels */}
          <div className="min-w-0">
            <MacosContent />
            <LinuxContent />
            <WindowsContent />
          </div>
        </div>
      </Tabs>
    </Section>
  )
}
