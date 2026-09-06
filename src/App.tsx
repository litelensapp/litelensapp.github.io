import type { FC } from "react"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Prerequisite } from "./components/Prerequisite"
import { Download } from "./components/download/Download"

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
