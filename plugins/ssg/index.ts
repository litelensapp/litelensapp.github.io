import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { basename, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import type { Plugin, ResolvedConfig } from "vite"
import { build as viteBuild } from "vite"
import { SCHEMA_MARKER_END, SCHEMA_MARKER_START } from "../seo/index.ts"
import type { PageMeta } from "../seo/pages.ts"
import { buildSchemaTags } from "../seo/schema.ts"

interface SsgOptions {
  /** SSR entry module exporting a `render(url: string): string` function. */
  entry: string
  siteUrl: string
  name: string
  /** Pages to prerender. Each becomes `<outDir><path>/index.html`. */
  pages: PageMeta[]
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/"/g, "&quot;")
}

function replaceAttr(html: string, matchAttr: RegExp, value: string): string {
  return html.replace(matchAttr, `$1${escapeAttr(value)}$2`)
}

/** Rewrites the per-page head tags (title, description, canonical, OG/Twitter, JSON-LD) that
 * `seoPlugin` stamped onto the built `index.html` with the ones for `page` — every prerendered
 * route otherwise inherits the homepage's head as-is, since only the `<div id="root">` body
 * differs between routes. */
function applyPageHead(template: string, siteUrl: string, name: string, page: PageMeta): string {
  const normalizedSiteUrl = siteUrl?.replace(/\/+$/, "") ?? ""
  const pageUrl = page.path === "/" ? `${normalizedSiteUrl}/` : `${normalizedSiteUrl}${page.path}`

  let html = template
  html = html.replace(/<title>.*<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
  html = replaceAttr(html, /(<meta name="description" content=")[^"]*(")/, page.description)
  html = replaceAttr(html, /(<link rel="canonical" href=")[^"]*(")/, pageUrl)
  html = replaceAttr(html, /(property="og:url" content=")[^"]*(")/, pageUrl)
  html = replaceAttr(html, /(property="og:title" content=")[^"]*(")/, page.title)
  html = replaceAttr(html, /(property="og:description" content=")[^"]*(")/, page.description)
  html = replaceAttr(html, /(name="twitter:url" content=")[^"]*(")/, pageUrl)
  html = replaceAttr(html, /(name="twitter:title" content=")[^"]*(")/, page.title)
  html = replaceAttr(html, /(name="twitter:description" content=")[^"]*(")/, page.description)

  const schemaTags = buildSchemaTags({ siteUrl, name, description: page.description, page })
  html = html.replace(
    new RegExp(`${SCHEMA_MARKER_START}[\\s\\S]*?${SCHEMA_MARKER_END}`),
    `${SCHEMA_MARKER_START}\n  ${schemaTags}\n  ${SCHEMA_MARKER_END}`
  )

  return html
}

/**
 * Prerenders `pages` to static `index.html` files after the client build finishes, by
 * running a second SSR build of `entry` and rendering each route with `renderToString`.
 * Gives each route a real static file so it doesn't depend on client-side routing or a
 * CDN/server SPA fallback to serve it, and stamps each with its own title/description/
 * canonical/OG/JSON-LD instead of inheriting the homepage's.
 */
export function ssgPlugin({ entry, siteUrl, name, pages }: SsgOptions): Plugin {
  let config: ResolvedConfig

  return {
    name: "ssg-prerender",
    apply: "build",
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    async closeBundle() {
      // Skip when this plugin is running inside the nested SSR build below.
      if (config.build.ssr) return

      const outDir = resolve(config.root, config.build.outDir)
      // Nested under the project's node_modules (not os.tmpdir()) so Node's module
      // resolution can still walk up to the project's node_modules when importing
      // the rendered bundle below.
      const cacheDir = resolve(config.root, "node_modules/.cache/ssg")
      mkdirSync(cacheDir, { recursive: true })
      const ssrOutDir = mkdtempSync(resolve(cacheDir, "build-"))

      await viteBuild({
        configFile: config.configFile,
        root: config.root,
        mode: config.mode,
        build: { ssr: entry, outDir: ssrOutDir, emptyOutDir: true },
      })

      const entryFileName = `${basename(entry).replace(/\.[tj]sx?$/, "")}.js`
      const { render } = (await import(pathToFileURL(resolve(ssrOutDir, entryFileName)).href)) as {
        render: (url: string) => string | Promise<string>
      }

      const template = readFileSync(resolve(outDir, "index.html"), "utf-8")

      await Promise.all(
        pages.map(async (page) => {
          const appHtml = await render(page.path)
          const withBody = template.replace(
            '<div id="root"></div>',
            `<div id="root">${appHtml}</div>`
          )
          const html = page.path === "/" ? withBody : applyPageHead(withBody, siteUrl, name, page)

          const routeDir = resolve(outDir, page.path.replace(/^\//, ""))
          mkdirSync(routeDir, { recursive: true })
          writeFileSync(resolve(routeDir, "index.html"), html)
        })
      )

      rmSync(ssrOutDir, { recursive: true, force: true })
    },
  }
}
