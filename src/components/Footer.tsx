import type { FC } from "react"
import { AuthorModal } from "./AuthorModal"

export const Footer: FC = () => {
  return (
    <footer className="flex h-8 items-center justify-between bg-success px-6 md:h-12">
      <AuthorModal />
      <span className="text-white">© 2026 Litelens. All rights reserved.</span>
    </footer>
  )
}
