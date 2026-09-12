import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@litelens/design-system/atoms"
import { Divider } from "@litelens/design-system/components"
import { useBreakpoint } from "@litelens/design-system/hooks"
import { Link } from "@tanstack/react-router"
import { useEffect, useState, type FC } from "react"
import { MenuIcon } from "../../components/icons/MenuIcon"
import { GithubReleaseBadge } from "../../pages/home/components/badges/GithubReleaseBadge"
import { HeaderTitle } from "./HeaderTitle"
import { HEADER_LINK_GROUPS } from "./nav-items"

export const HeaderMobileView: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isDesktop = useBreakpoint("md")

  useEffect(() => {
    if (isDesktop) setMobileMenuOpen(false)
  }, [isDesktop])

  return (
    <div className="ml-auto md:hidden">
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Open menu">
              <MenuIcon className="size-5" />
            </Button>
          }
        />
        <SheetContent
          side="right"
          showCloseButton
          className="inset-0 h-dvh w-full max-w-none gap-0 rounded-none border-l-0 p-4"
        >
          <SheetHeader className="p-0">
            <SheetClose render={<HeaderTitle className="w-fit" />} />
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          </SheetHeader>

          <Divider className="my-4" />

          <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
            {HEADER_LINK_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col gap-2">
                <span className="text-label px-3 text-muted-foreground">{group.title}</span>
                {group.links.map((link) => (
                  <SheetClose
                    key={link.label}
                    render={
                      <Link
                        to={link.to}
                        className="text-h3 block rounded-lg px-3 py-2 text-foreground hover:bg-accent"
                        activeProps={{
                          className: "text-success",
                        }}
                      >
                        {link.label}
                      </Link>
                    }
                  />
                ))}
              </div>
            ))}
          </div>

          <Divider className="my-4" />

          <div className="mt-auto flex items-center">
            <GithubReleaseBadge />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
