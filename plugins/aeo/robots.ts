export interface RobotsConfig {
  siteUrl: string
}

export function buildRobotsTxt(config: RobotsConfig): string {
  const normalizedSiteUrl = config.siteUrl?.replace(/\/+$/, "") ?? ""

  return [
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
  ].join("\n")
}
