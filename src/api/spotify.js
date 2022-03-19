import axios from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import qs from "qs"
import { getRecoil, setRecoil } from "recoil-nexus"
import spotifyAuthState from "../recoil/spotifyAuthState"
import scopes from "../service/Scopes"

const BASE_URL = "https://api.spotify.com/v1"
const REDIRECT_URI = "http://localhost:3000/callback"
const CLIENT_ID = "0ed7c8cbcdf74e53b7bb0f3f11231171"
const CLIENT_SECRET = "1a9bfd2ede0b4719ab02608486b7a54c"
const SPOT_AUTH = "spotify-authentication"

const authHeader = () => {
  const spotifyAuth = getRecoil(spotifyAuthState)
  return {
    Authorization: `Bearer ${spotifyAuth.access_token}`,
  }
}

const spotifyFetcher = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
})

export const requestRefreshedAccessToken = async (failedRequest) => {
  console.log("refreshing token..")
  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "refresh_token",
        refresh_token: getRecoil(spotifyAuthState).refresh_token,
      }),
      {
        headers: {
          Authorization:
            "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((resp) => {
      setRecoil(
        spotifyAuthState,
        Object.assign({}, getRecoil(spotifyAuthState), resp.data)
      )
      if (failedRequest)
        failedRequest.response.config.headers[
          "Authorization"
        ] = `Bearer ${resp.data.access_token}`
      return
    })
    .catch((error) => {
      console.log("error", error.message)
      return error
    })
}

createAuthRefreshInterceptor(axios, requestRefreshedAccessToken)
createAuthRefreshInterceptor(spotifyFetcher, requestRefreshedAccessToken)

export const fetchCurrentUserPlaylist = async () => {
  return spotifyFetcher
    .get("me/playlists", {
      params: { limit: 50 },
      headers: authHeader(),
    })
    .then((response) => {
      // console.log("response", response)
      return response.data
    })
    .catch((error) => console.log("error", error))
}

export const fetchPlaylistItems = (playlits_id) => {
  axios.get(`${BASE_URL}/playlists/${playlits_id}/tracks`, {})
}

export const fetchCurrentUserProfile = async () => {
  return spotifyFetcher
    .get("me", {
      headers: authHeader(),
    })
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

export const requestUserAuthorization = () => {
  const _url = new URL("https://accounts.spotify.com/authorize")
  _url.searchParams.append("client_id", CLIENT_ID)
  _url.searchParams.append("response_type", "code")
  _url.searchParams.append("redirect_uri", REDIRECT_URI)
  // _url.searchParams.append("state", "")
  _url.searchParams.append("scope", scopes.join(" "))
  _url.searchParams.append("show_dialog", false)

  window.location = _url
}

export const requestAccessToken = async (code) => {
  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          Authorization:
            "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((resp) => {
      setRecoil(spotifyAuthState, resp.data)

      return
    })
    .catch((error) => {
      console.log("error", error.message)
      return error
    })
}
