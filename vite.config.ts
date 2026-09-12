import { defineConfig, loadEnv } from "vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { seoPlugin } from "./plugins/seo/index.ts"
import { aeoPlugin } from "./plugins/aeo/index.ts"
import { ssgPlugin } from "./plugins/ssg/index.ts"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
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
        title: env.VITE_APP_TITLE,
        description: env.VITE_APP_DESCRIPTION,
      }),
      aeoPlugin({
        siteUrl: env.VITE_APP_SITE_URL,
        name: env.VITE_APP_NAME,
        description: env.VITE_APP_DESCRIPTION,
      }),
      ssgPlugin({
        entry: "./src/entry-server.tsx",
        routes: ["/", "/features/core", "/features/plugins"],
      }),
    ],
  }
})
