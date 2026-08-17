import { cn } from "@litelens/design-system/utils"
import { useEffect, useState, type FC } from "react"
import logo from "../assets/logo-transparent.png"
import { GithubReleaseBadge } from "./badges/GithubReleaseBadge"

export const Header: FC = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-16 items-center border-b border-border bg-background px-6 transition-shadow duration-200",
        scrolled && "shadow-sm"
      )}
    >
      <div className="flex items-center gap-4">
        <img src={logo} alt="Litelens" className="h-8 w-auto" />
        <span className="text-h1 font-heading text-foreground">Litelens</span>
      </div>

      <div className="ml-auto flex items-center">
        <GithubReleaseBadge />
      </div>
    </header>
  )
}
