import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { basename, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import type { Plugin, ResolvedConfig } from "vite"
import { build as viteBuild } from "vite"

interface SsgOptions {
  /** SSR entry module exporting a `render(url: string): string` function. */
  entry: string
  /** Routes to prerender, e.g. ['/v1', '/v2']. Each becomes `<outDir><route>/index.html`. */
  routes: string[]
}

/**
 * Prerenders `routes` to static `index.html` files after the client build finishes, by
 * running a second SSR build of `entry` and rendering each route with `renderToString`.
 * Gives each route a real static file so it doesn't depend on client-side routing or a
 * CDN/server SPA fallback to serve it.
 */
export function ssgPlugin({ entry, routes }: SsgOptions): Plugin {
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
        render: (url: string) => string
      }

      const template = readFileSync(resolve(outDir, "index.html"), "utf-8")

      for (const route of routes) {
        const appHtml = render(route)
        const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
        const routeDir = resolve(outDir, route.replace(/^\//, ""))
        mkdirSync(routeDir, { recursive: true })
        writeFileSync(resolve(routeDir, "index.html"), html)
      }

      rmSync(ssrOutDir, { recursive: true, force: true })
    },
  }
}
