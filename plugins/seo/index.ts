import type { Plugin } from "vite"
import type { PageMeta } from "./pages.ts"
import { buildSchemaTags } from "./schema.ts"
import { buildSitemap } from "./sitemap.ts"

interface SeoConfig {
  siteUrl: string
  name: string
  description: string
  pages: PageMeta[]
}

export const SCHEMA_MARKER_START = "<!-- seo:schema:start -->"
export const SCHEMA_MARKER_END = "<!-- seo:schema:end -->"

export function seoPlugin(config: SeoConfig): Plugin {
  return {
    name: "seo-files",
    apply: "build",

    transformIndexHtml(html: string) {
      const homePage = config.pages.find((page) => page.path === "/")
      if (!homePage) return html

      const tags = buildSchemaTags({
        siteUrl: config.siteUrl,
        name: config.name,
        description: config.description,
        page: homePage,
      })
      return html.replace(
        "</head>",
        `  ${SCHEMA_MARKER_START}\n  ${tags}\n  ${SCHEMA_MARKER_END}\n  </head>`
      )
    },

    generateBundle() {
      if (!config.siteUrl) {
        this.warn("Skipping sitemap.xml generation because VITE_APP_SITE_URL is not set.")
        return
      }

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: buildSitemap({ siteUrl: config.siteUrl, name: config.name, pages: config.pages }),
      })
    },
  }
}
