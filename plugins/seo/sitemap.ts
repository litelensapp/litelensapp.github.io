export interface SitemapConfig {
  siteUrl: string
  name: string
}

export function buildSitemap(config: SitemapConfig): string {
  const normalizedSiteUrl = config.siteUrl?.replace(/\/+$/, "") ?? ""
  const lastModified = new Date().toISOString().split("T")[0]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${normalizedSiteUrl}/</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${normalizedSiteUrl}/og-image.png</image:loc>
      <image:title>${config.name} — Native Desktop Dashboard for Kubernetes</image:title>
    </image:image>
  </url>
</urlset>
`
}
