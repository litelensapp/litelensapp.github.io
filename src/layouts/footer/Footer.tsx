import { Divider } from "@litelens/design-system/components"
import type { FC } from "react"
import { Link } from "@tanstack/react-router"
import { AuthorModal } from "./AuthorModal"
import { FOOTER_LINK_GROUPS } from "./nav-items"

export const Footer: FC = () => {
  return (
    <footer className="bg-success">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-6">
        <div className="grid grid-cols-2 gap-8 py-8 sm:grid-cols-3">
          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <span className="text-label font-semibold text-white">{group.title}</span>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) =>
                  link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        hash={link.hash}
                        className="text-white/80 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <Divider className="border-white/30" />

        <div className="flex h-20 flex-col items-center justify-center md:h-12 md:flex-row md:justify-between">
          <AuthorModal />
          <span className="text-white">© 2026 Litelens. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
