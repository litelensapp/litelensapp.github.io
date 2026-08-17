import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { seoFiles } from "./plugins/seo.ts"
import { aeoFiles } from "./plugins/aeo.ts"

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    base: command === "build" ? "./" : "/",
    plugins: [
      react(),
      tailwindcss(),
      seoFiles({
        siteUrl: env.VITE_APP_SITE_URL,
        name: env.VITE_APP_NAME,
        title: env.VITE_APP_TITLE,
        description: env.VITE_APP_DESCRIPTION,
      }),
      aeoFiles({
        siteUrl: env.VITE_APP_SITE_URL,
        name: env.VITE_APP_NAME,
        description: env.VITE_APP_DESCRIPTION,
      }),
    ],
  }
})
