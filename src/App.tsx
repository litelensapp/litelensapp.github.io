import type { FC } from "react"
import { Footer } from "./layouts/footer/Footer"
import { Header } from "./layouts/header/Header"
import { Hero } from "./pages/home/Hero"
import { Prerequisite } from "./pages/home/Prerequisite"
import { Download } from "./pages/home/download/Download"

export const App: FC = () => {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1">
        <Hero />
        <Prerequisite />
        <Download />
      </main>
      <Footer />
    </div>
  )
}
