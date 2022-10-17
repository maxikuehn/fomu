import spotifyFetcher from "../spotifyFetcher"

export const getProfile = async () => {
  return spotifyFetcher.get("me").then((response) => {
    return response.data
  })
}
