import { getRecoil, setRecoil } from "recoil-nexus"
import { spotifyAuthState } from "../../recoil"
import scopes from "../../services/Scopes"
import netlifyFetcher from "../netlifyFetcher"

const BASE_URL = window.location.origin
const REDIRECT_URI = BASE_URL + "/callback"
const CLIENT_ID = import.meta.env.VITE_SP_CLIENT_ID

export const refresh = async (failedRequest: any) => {
  console.log("refreshing token..")
  console.log(getRecoil(spotifyAuthState))

  return netlifyFetcher
    .post("refresh", {
      access_token: getRecoil(spotifyAuthState)?.refresh_token,
    })
    .then((resp) => {
      setRecoil(
        spotifyAuthState,
        Object.assign({}, getRecoil(spotifyAuthState), resp.data)
      )
      if (failedRequest) {
        failedRequest.response.config.headers[
          "Authorization"
        ] = `Bearer ${resp.data.access_token}`
        console.log("failedRequest", failedRequest.response)
      }
      return Promise.resolve()
    })
}

export const get = async (code: string) => {
  return netlifyFetcher
    .post("token", {
      href: REDIRECT_URI,
      code,
    })
    .then((resp) => {
      return resp.data
    })
    .catch((error) => {
      console.error(error)
      return undefined
    })
}

export const authorize = async () => {
  const generateRandomString = (length: number) => {
    let text = ""
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  const _url = new URL("https://accounts.spotify.com/authorize")
  _url.searchParams.append("client_id", CLIENT_ID)
  _url.searchParams.append("response_type", "code")
  _url.searchParams.append("redirect_uri", REDIRECT_URI)
  _url.searchParams.append("state", generateRandomString(16))
  _url.searchParams.append("scope", scopes.join(" "))
  _url.searchParams.append("show_dialog", "false")

  return _url.toString()
}
