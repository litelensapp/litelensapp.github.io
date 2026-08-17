import type { Plugin } from "vite"

interface SeoConfig {
  siteUrl: string
  name: string
  title: string
  description: string
}

export function seoFiles(config: SeoConfig): Plugin {
  const normalizedSiteUrl = config.siteUrl?.replace(/\/+$/, "") ?? ""

  return {
    name: "seo-files",
    apply: "build",

    transformIndexHtml(html: string) {
      const schemas = [
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "@id": `${normalizedSiteUrl}/#software`,
          name: config.name,
          url: normalizedSiteUrl,
          image: `${normalizedSiteUrl}/og-image.png`,
          description: config.description,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "macOS, Linux",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          featureList: [
            "Native desktop dashboard for Kubernetes clusters",
            "Watch-based UI that reflects live cluster state",
            "Lightweight — no Electron overhead",
            "Install via Homebrew on macOS",
            "Install via apt on Ubuntu",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${normalizedSiteUrl}/`,
            },
          ],
        },
      ]

      const tags = schemas
        .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
        .join("\n  ")
      return html.replace("</head>", `  ${tags}\n  </head>`)
    },

    generateBundle() {
      if (!config.siteUrl) {
        this.warn("Skipping sitemap.xml generation because VITE_APP_SITE_URL is not set.")
        return
      }

      const lastModified = new Date().toISOString().split("T")[0]

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>
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
`,
      })
    },
  }
}
