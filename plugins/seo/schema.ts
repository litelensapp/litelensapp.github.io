export interface SchemaConfig {
  siteUrl: string
  name: string
  description: string
}

export function buildSchemaTags(config: SchemaConfig): string {
  const normalizedSiteUrl = config.siteUrl?.replace(/\/+$/, "") ?? ""

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

  return schemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n  ")
}
