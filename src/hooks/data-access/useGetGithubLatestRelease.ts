import { useQuery } from "@tanstack/react-query"

interface GithubRelease {
  tag_name: string
}

export const useGetGithubLatestRelease = () => {
  const url = `${import.meta.env.VITE_APP_RELEASE_API_URL}/latest`
  return useQuery({
    queryKey: ["fetch", url],
    queryFn: async (): Promise<GithubRelease> => {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Request to ${url} failed with status ${res.status}`)
      return res.json() as Promise<GithubRelease>
    },
  })
}
