import { getRecoil, setRecoil, resetRecoil } from "recoil-nexus"
import { currentUserState, spotifyAuthState } from "../../recoil"
import scopes from "../../services/Scopes"
import netlifyFetcher from "../netlifyFetcher"
import { encrypt } from "../../services/encryption"

const BASE_URL = window.location.origin
const REDIRECT_URI = BASE_URL + "/callback"
const CLIENT_ID = import.meta.env.VITE_SP_CLIENT_ID

export const refresh = async (failedRequest: any) => {
  console.debug("refreshing token..")
  const user_id = getRecoil(currentUserState)?.id
  if (!user_id) return

  const publicKeyData = (await netlifyFetcher.get("public")).data
  const cipher = await encrypt(user_id, publicKeyData)
  return netlifyFetcher
    .post("refresh", cipher)
    .then((resp) => {
      setRecoil(
        spotifyAuthState,
        Object.assign({}, getRecoil(spotifyAuthState), {
          access_token: resp.data,
        })
      )
      if (failedRequest) {
        failedRequest.response.config.headers[
          "Authorization"
        ] = `Bearer ${resp.data.access_token}`
        console.debug(
          "[spotify]",
          "repeating failed request with new token",
          failedRequest.response
        )
      }
      return Promise.resolve()
    })
    .catch(() => {
      return resetRecoil(spotifyAuthState)
    })
}

export const get = async (code: string) => {
  if (!code || code === "") return
  const code_verifier = window.localStorage.getItem("code_verifier")
  return netlifyFetcher
    .post("token", {
      href: REDIRECT_URI,
      code,
      code_verifier,
    })
    .then((resp) => {
      return resp.data
    })
    .catch((error) => {
      console.error("[spotify]", "failed to fetch token", error)
      return undefined
    })
}

export const requestAuthorization = async () => {
  const generateRandomString = (length: number) => {
    let text = ""
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  async function generateCodeChallenge(codeVerifier: string) {
    const digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(codeVerifier)
    )
    return window
      .btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
  }

  const codeVerifier = generateRandomString(128)
  const code_challenge = await generateCodeChallenge(codeVerifier)
  window.localStorage.setItem("code_verifier", codeVerifier)

  const _url = new URL("https://accounts.spotify.com/authorize")
  _url.search = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: generateRandomString(16),
    scope: scopes.join(" "),
    show_dialog: "false",
    code_challenge_method: "S256",
    code_challenge,
  }).toString()
  window.location.assign(_url.toString())
}
