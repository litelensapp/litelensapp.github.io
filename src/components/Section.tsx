import { cn } from "@litelens/design-system/utils"
import type { FC, ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  paddingBotton?: boolean
}

export const Section: FC<SectionProps> = ({ children, paddingBotton }) => {
  return (
    <section className={cn("bg-background px-6 py-4 md:pt-16", paddingBotton && "md:pb-16")}>
      {children}
    </section>
  )
}
