import { cn } from "@litelens/design-system/utils"
import { Link } from "@tanstack/react-router"
import type { FC } from "react"
import logo from "../../assets/logo-transparent.png"

export const HeaderTitle: FC<{ className?: string }> = ({ className }) => (
  <Link to="/" className={cn("flex items-center gap-4", className)}>
    <img src={logo} alt="Litelens" className="h-8 w-auto" />
    <span className="text-h1 font-heading text-foreground">Litelens</span>
  </Link>
)
