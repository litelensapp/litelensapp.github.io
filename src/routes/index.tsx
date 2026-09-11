import { createFileRoute } from "@tanstack/react-router"
import type { FC } from "react"
import { Download } from "../pages/home/download/Download"
import { Hero } from "../pages/home/Hero"
import { Prerequisite } from "../pages/home/Prerequisite"

const RouteComponent: FC = () => {
  return (
    <>
      <Hero />
      <Prerequisite />
      <Download />
    </>
  )
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
})
