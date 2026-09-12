import {
  Button,
  ChevronDownIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@litelens/design-system/atoms"
import { cn } from "@litelens/design-system/utils"
import { useMatchRoute, useNavigate } from "@tanstack/react-router"
import type { FC } from "react"
import { GithubReleaseBadge } from "../../pages/home/components/badges/GithubReleaseBadge"
import { HEADER_LINK_GROUPS } from "./nav-items"

export const HeaderDesktopView: FC = () => {
  const navigate = useNavigate()
  const matchRoute = useMatchRoute()

  return (
    <>
      <nav className="ml-8 hidden items-center gap-1 md:flex">
        {HEADER_LINK_GROUPS.map((group) => (
          <DropdownMenu key={group.title}>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" className="group">
                  {group.title}
                  <ChevronDownIcon className="size-4 transition-transform duration-200 group-data-popup-open:rotate-180" />
                </Button>
              }
            />
            <DropdownMenuContent className="w-56 rounded-xl p-2">
              {group.links.map((link) => (
                <DropdownMenuItem
                  key={link.label}
                  className={cn(
                    "rounded-lg px-4 py-3",
                    matchRoute({ to: link.to }) && "text-success"
                  )}
                  onClick={() => navigate({ to: link.to })}
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </nav>

      <div className="ml-auto hidden items-center md:flex">
        <GithubReleaseBadge />
      </div>
    </>
  )
}
