import { useQuery } from "@tanstack/react-query"

interface GithubRepo {
  license: { spdx_id: string } | null
}

export const useGetGithubLicense = () => {
  const url = import.meta.env.VITE_APP_GITHUB_REPO_API_URL

  return useQuery({
    queryKey: ["fetch", url],
    queryFn: async (): Promise<GithubRepo> => {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Request to ${url} failed with status ${res.status}`)
      return res.json() as Promise<GithubRepo>
    },
  })
}
