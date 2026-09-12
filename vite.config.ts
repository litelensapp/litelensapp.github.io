import { defineConfig, loadEnv } from "vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { seoPlugin } from "./plugins/seo/index.ts"
import type { PageMeta } from "./plugins/seo/pages.ts"
import { aeoPlugin } from "./plugins/aeo/index.ts"
import { ssgPlugin } from "./plugins/ssg/index.ts"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  const pages: PageMeta[] = [
    {
      path: "/",
      title: env.VITE_APP_TITLE,
      description: env.VITE_APP_DESCRIPTION,
    },
    {
      path: "/features/core",
      title: "Core Features: Workloads, Logs & Port-Forward | Litelens",
      description:
        "Browse every workload in a live, watch-based view, stream pod logs and exec into a terminal, port-forward with one click, and filter across namespaces — all from the Litelens desktop app.",
      breadcrumbLabel: "Core Features",
    },
    {
      path: "/features/plugins",
      title: "Extend Litelens with Plugins & a Custom Marketplace",
      description:
        "Add new capabilities to Litelens without waiting on a core release. Install plugins from the official marketplace, or point Litelens at your own custom marketplace.",
      breadcrumbLabel: "Plugins",
    },
  ]

  return {
    base: "/",
    plugins: [
      // Must come before react() — see @tanstack/router-plugin.
      tanstackRouter({ target: "react" }),
      react(),
      tailwindcss(),
      seoPlugin({
        siteUrl: env.VITE_APP_SITE_URL,
        name: env.VITE_APP_NAME,
        description: env.VITE_APP_DESCRIPTION,
        pages,
      }),
      aeoPlugin({
        siteUrl: env.VITE_APP_SITE_URL,
        name: env.VITE_APP_NAME,
        description: env.VITE_APP_DESCRIPTION,
        pages,
      }),
      ssgPlugin({
        entry: "./src/entry-server.tsx",
        siteUrl: env.VITE_APP_SITE_URL,
        name: env.VITE_APP_NAME,
        pages,
      }),
    ],
  }
})
