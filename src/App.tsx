import type { FC } from "react"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Download } from "./components/download/Download"

const App: FC = () => {
  return (
    <div className="h-dvh overflow-x-hidden">
      <Header />
      <main className="mx-auto max-w-7xl">
        <Hero />
        <Download />
      </main>
      <Footer />
    </div>
  )
}

export default App
