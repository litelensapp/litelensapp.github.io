import type { Plugin } from "vite"
import type { PageMeta } from "../seo/pages.ts"
import { buildRobotsTxt } from "./robots.ts"
import { buildLlmsTxt } from "./llms.ts"

interface AeoConfig {
  siteUrl: string
  name: string
  description: string
  pages: PageMeta[]
}

export function aeoPlugin(config: AeoConfig): Plugin {
  return {
    name: "aeo-files",
    apply: "build",

    generateBundle() {
      if (!config.siteUrl) {
        this.warn(
          "Skipping robots.txt and llms.txt generation because VITE_APP_SITE_URL is not set."
        )
        return
      }

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: buildRobotsTxt(config),
      })

      this.emitFile({
        type: "asset",
        fileName: "llms.txt",
        source: buildLlmsTxt(config),
      })
    },
  }
}
