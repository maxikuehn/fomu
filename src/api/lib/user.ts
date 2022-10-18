import spotifyFetcher from "../spotifyFetcher"

export const profile = async () => {
  return spotifyFetcher.get("me").then((response) => {
    return response.data
  })
}
