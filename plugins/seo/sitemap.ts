import type { PageMeta } from "./pages.ts"

export interface SitemapConfig {
  siteUrl: string
  name: string
  pages: PageMeta[]
}

export function buildSitemap(config: SitemapConfig): string {
  const normalizedSiteUrl = config.siteUrl?.replace(/\/+$/, "") ?? ""
  const lastModified = new Date().toISOString().split("T")[0]

  const urls = config.pages
    .map((page) => {
      const isHome = page.path === "/"
      const loc = isHome ? `${normalizedSiteUrl}/` : `${normalizedSiteUrl}${page.path}`
      const priority = isHome ? "1.0" : "0.8"
      const image = isHome
        ? `\n    <image:image>\n      <image:loc>${normalizedSiteUrl}/og-image.png</image:loc>\n      <image:title>${config.name} — Native Desktop Dashboard for Kubernetes</image:title>\n    </image:image>`
        : ""

      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>${image}\n  </url>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`
}
