import type { Plugin } from "vite"

interface AeoConfig {
  siteUrl: string
  name: string
  description: string
}

export function aeoFiles(config: AeoConfig): Plugin {
  const normalizedSiteUrl = config.siteUrl?.replace(/\/+$/, "") ?? ""

  return {
    name: "aeo-files",
    apply: "build",

    generateBundle() {
      if (!config.siteUrl) {
        this.warn(
          "Skipping robots.txt and llms.txt generation because VITE_APP_SITE_URL is not set."
        )
        return
      }

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: [
          `User-agent: *`,
          `Allow: /`,
          ``,
          `# Social / OG crawlers`,
          `User-agent: facebookexternalhit`,
          `Allow: /`,
          ``,
          `User-agent: Facebot`,
          `Allow: /`,
          ``,
          `# AI crawlers — explicitly allowed`,
          `User-agent: GPTBot`,
          `Allow: /`,
          ``,
          `User-agent: ChatGPT-User`,
          `Allow: /`,
          ``,
          `User-agent: ClaudeBot`,
          `Allow: /`,
          ``,
          `User-agent: anthropic-ai`,
          `Allow: /`,
          ``,
          `User-agent: PerplexityBot`,
          `Allow: /`,
          ``,
          `User-agent: Googlebot-Extended`,
          `Allow: /`,
          ``,
          `Sitemap: ${normalizedSiteUrl}/sitemap.xml`,
          `LLMs: ${normalizedSiteUrl}/llms.txt`,
        ].join("\n"),
      })

      this.emitFile({
        type: "asset",
        fileName: "llms.txt",
        source: [
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
          `## Resources`,
          ``,
          `- App: ${normalizedSiteUrl}/`,
          `- Source & releases: https://github.com/litelensapp/litelens`,
        ].join("\n"),
      })
    },
  }
}
