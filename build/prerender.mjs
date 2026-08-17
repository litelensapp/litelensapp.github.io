import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import React from "react"
import { renderToString } from "react-dom/server"

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, "..")
const distDir = join(projectRoot, "dist")
const indexHtmlPath = join(distDir, "index.html")
const ssrBuildDir = join(distDir, "ssr-build")

async function prerender() {
  try {
    console.log("Prerendering HTML...")

    // Find the SSR bundle output file
    // Vite outputs with a hash, so we need to find the .js file
    let ssrModulePath = null

    try {
      const files = readdirSync(ssrBuildDir)
      const jsFile = files.find((f) => f.endsWith(".js"))

      if (!jsFile) {
        throw new Error("No JavaScript file found in SSR build output")
      }

      ssrModulePath = join(ssrBuildDir, jsFile)
    } catch (err) {
      console.error("Error reading SSR build directory:", err.message)
      throw err
    }

    // Import the SSR module
    let appHtml = ""
    try {
      const appModule = await import(`file://${ssrModulePath}`)
      const AppWrapper = appModule.default

      // Render the component to a string
      appHtml = renderToString(React.createElement(AppWrapper))
      console.log("✓ Successfully rendered component to HTML")
    } catch (renderError) {
      console.error("Error during rendering:", renderError.message)
      throw renderError
    }

    // Read the existing index.html (which has SEO/AEO tags from Vite plugins)
    let html = readFileSync(indexHtmlPath, "utf-8")

    // Replace the empty root div with the rendered content
    html = html.replace(/<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`)

    // Write back to dist
    writeFileSync(indexHtmlPath, html, "utf-8")
    console.log("✓ Prerendering complete: dist/index.html")
  } catch (error) {
    console.error("✗ Prerendering failed:", error.message)
    process.exit(1)
  }
}

prerender()
