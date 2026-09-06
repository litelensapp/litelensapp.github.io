import type { Plugin } from "vite"
import { buildSchemaTags } from "./schema.ts"
import { buildSitemap } from "./sitemap.ts"

interface SeoConfig {
  siteUrl: string
  name: string
  title: string
  description: string
}

export function seoPlugin(config: SeoConfig): Plugin {
  return {
    name: "seo-files",
    apply: "build",

    transformIndexHtml(html: string) {
      const tags = buildSchemaTags(config)
      return html.replace("</head>", `  ${tags}\n  </head>`)
    },

    generateBundle() {
      if (!config.siteUrl) {
        this.warn("Skipping sitemap.xml generation because VITE_APP_SITE_URL is not set.")
        return
      }

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: buildSitemap(config),
      })
    },
  }
}
