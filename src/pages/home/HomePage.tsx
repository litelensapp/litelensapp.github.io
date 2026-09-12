import type { FC } from "react"
import { Download } from "./components/download/Download"
import { Hero } from "./components/Hero"
import { Prerequisite } from "./components/Prerequisite"

export const HomePage: FC = () => {
  return (
    <>
      <Hero />
      <Prerequisite />
      <Download />
    </>
  )
}
