const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL

interface FooterLinkGroup {
  title: string
  links: { label: string; to: string; hash?: string; external?: boolean }[]
}

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Prerequisite", to: "/", hash: "prerequisite" },
      { label: "Download", to: "/", hash: "installation" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Core", to: "/features/core" },
      { label: "Plugins", to: "/features/plugins" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", to: GITHUB_URL, external: true },
      { label: "Releases", to: `${GITHUB_URL}/releases`, external: true },
      { label: "Issues", to: `${GITHUB_URL}/issues`, external: true },
    ],
  },
]
