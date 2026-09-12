import {
  Button,
  ChevronDownIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@litelens/design-system/atoms"
import { cn } from "@litelens/design-system/utils"
import { Link, useNavigate } from "@tanstack/react-router"
import { useEffect, useState, type FC } from "react"
import logo from "../../assets/logo-transparent.png"
import { GithubReleaseBadge } from "../../pages/home/badges/GithubReleaseBadge"

export const Header: FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

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
      <Link to="/" className="flex items-center gap-4">
        <img src={logo} alt="Litelens" className="h-8 w-auto" />
        <span className="text-h1 font-heading text-foreground">Litelens</span>
      </Link>

      <nav className="ml-8 flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="group">
                Features
                <ChevronDownIcon className="size-4 transition-transform duration-200 group-data-popup-open:rotate-180" />
              </Button>
            }
          />
          <DropdownMenuContent className="w-56 rounded-xl p-2">
            <DropdownMenuItem
              className="rounded-lg px-4 py-3"
              onClick={() => navigate({ to: "/features/core" })}
            >
              Core
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-lg px-4 py-3"
              onClick={() => navigate({ to: "/features/plugins" })}
            >
              Plugins
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <div className="ml-auto flex items-center">
        <GithubReleaseBadge />
      </div>
    </header>
  )
}
