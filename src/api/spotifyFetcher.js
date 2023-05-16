import axios from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import { delay as _delay } from "lodash"
import { getRecoil } from "recoil-nexus"
import { spotifyAuthState } from "../recoil"
import { refresh } from "./lib/token"

const spotifyFetcher = axios.create({
  baseURL: "https://api.spotify.com/v1",
  timeout: 3000,
})

spotifyFetcher.interceptors.request.use((config) => {
  const spotifyAuth = getRecoil(spotifyAuthState)
  config.headers.Authorization = `Bearer ${spotifyAuth.access_token}`
  return config
})

createAuthRefreshInterceptor(spotifyFetcher, refresh, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
})

spotifyFetcher.interceptors.response.use(
  (value) => value,
  (error) => {
    console.error("[spotify]", error.message)
    // Server error => immediate retry
    if (error.config && error.response && error.response.status >= 500) {
      return spotifyFetcher.request({
        method: error.config.method,
        url: error.config.url,
        // headers: authHeader(),
        params: error.config.params,
        data: error.config.data,
      })
    }
    // 429 Error Code => retry after some ms
    if (error.config && error.response && error.response.status === 429) {
      _delay(() => {
        return spotifyFetcher.request({
          method: error.config.method,
          url: error.config.url,
          // headers: authHeader(),
          params: error.config.params,
          data: error.config.data,
        })
      }, error.response.headers["retry-after"] * 1000 ?? 3000)
    }
    return Promise.reject(error)
  }
)

export default spotifyFetcher
