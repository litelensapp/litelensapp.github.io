import type { PageMeta } from "../seo/pages.ts"

export interface LlmsConfig {
  siteUrl: string
  name: string
  description: string
  pages: PageMeta[]
}

export function buildLlmsTxt(config: LlmsConfig): string {
  const normalizedSiteUrl = config.siteUrl?.replace(/\/+$/, "") ?? ""
  const featurePages = config.pages.filter((page) => page.path !== "/")

  return [
    `# ${config.name}`,
    ``,
    `> ${config.description}`,
    ``,
    `## Installation`,
    ``,
    `**macOS**`,
    `- Homebrew: `,
    "  ```",
    `  brew tap litelensapp/homebrew-litelens`,
    `  brew trust litelensapp/litelens/litelens`,
    `  brew install litelens`,
    "  ```",
    `- Manual install script: `,
    "  ```",
    `  curl -fsSL "https://raw.githubusercontent.com/litelensapp/litelens/main/scripts/install.sh" | bash`,
    "  ```",
    `- Or download the Apple Silicon binary directly from the site`,
    ``,
    `**Linux (Ubuntu 24.04 "noble" and derivatives)**`,
    `- apt: add the Litelens APT repository, then \`sudo apt-get install litelens\` (see the site for the exact commands)`,
    `- Manual install script: same as macOS`,
    `- Or download the amd64 binary directly from the site`,
    ``,
    `**Windows**`,
    `- Prebuilt installers are not published yet — check the GitHub releases page for updates.`,
    ``,
    `## Key facts`,
    ``,
    `- Free and open source (license published on GitHub)`,
    `- Native app, not Electron-based — lightweight and fast`,
    `- Watch-based UI that reflects live Kubernetes cluster state`,
    ``,
    `## Features`,
    ``,
    ...featurePages.flatMap((page) => [
      `**${page.breadcrumbLabel ?? page.title}** (${normalizedSiteUrl}${page.path})`,
      `- ${page.description}`,
      ``,
    ]),
    `## Resources`,
    ``,
    `- App: ${normalizedSiteUrl}/`,
    `- Source & releases: https://github.com/litelensapp/litelens`,
  ].join("\n")
}
