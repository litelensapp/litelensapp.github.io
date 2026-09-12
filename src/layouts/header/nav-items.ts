interface HeaderLinkGroup {
  title: string
  links: { label: string; to: string }[]
}

export const HEADER_LINK_GROUPS: HeaderLinkGroup[] = [
  {
    title: "Features",
    links: [
      { label: "Core", to: "/features/core" },
      { label: "Plugins", to: "/features/plugins" },
    ],
  },
]
