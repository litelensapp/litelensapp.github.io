import type { PageMeta } from "./pages.ts"

export interface SchemaConfig {
  siteUrl: string
  name: string
  description: string
  page: PageMeta
}

/** Escapes characters that would let embedded JSON break out of a `<script>` tag. */
function escapeJsonForScript(json: string): string {
  return json.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026")
}

export function buildSchemaTags(config: SchemaConfig): string {
  const normalizedSiteUrl = config.siteUrl?.replace(/\/+$/, "") ?? ""
  const isHome = config.page.path === "/"

  const schemas: object[] = []

  if (isHome) {
    schemas.push({
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
    })
  }

  const breadcrumbItems: object[] = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${normalizedSiteUrl}/` },
  ]

  if (!isHome && config.page.breadcrumbLabel) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: config.page.breadcrumbLabel,
      item: `${normalizedSiteUrl}${config.page.path}`,
    })
  }

  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  })

  return schemas
    .map((s) => {
      const safeJson = escapeJsonForScript(JSON.stringify(s))
      return `<script type="application/ld+json">${safeJson}</script>`
    })
    .join("\n  ")
}
