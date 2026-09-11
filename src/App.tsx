import { Outlet } from "@tanstack/react-router"
import type { FC } from "react"
import { Footer } from "./layouts/footer/Footer"
import { Header } from "./layouts/header/Header"

export const App: FC = () => {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
