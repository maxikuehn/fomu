import { getRecoil, setRecoil, resetRecoil } from "recoil-nexus"
import { currentUserState, spotifyAuthState } from "../../recoil"
import scopes from "../../services/Scopes"
import netlifyFetcher from "../netlifyFetcher"

const BASE_URL = window.location.origin
const REDIRECT_URI = BASE_URL + "/callback"
const CLIENT_ID = import.meta.env.VITE_SP_CLIENT_ID
const SYM_KEY = import.meta.env.VITE_SYM_KEY

function str2ab(str) {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

const encrypt = async (data) => {
  const key = await window.crypto.subtle.importKey(
    "raw",
    str2ab(SYM_KEY),
    "AES-GCM",
    true,
    ["decrypt", "encrypt"]
  )
  const encoded = new TextEncoder().encode(data)
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const cipher = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encoded
  )
  return {
    cipher,
    iv,
  }
}

const pack = (buffer) =>
  window.btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))

export const refresh = async (failedRequest: any) => {
  console.log("refreshing token..")
  const user_id = getRecoil(currentUserState)?.id
  if (!user_id) return

  const { cipher, iv } = await encrypt(user_id)

  return netlifyFetcher
    .post(
      "refresh",
      JSON.stringify({
        cipher: pack(cipher),
        iv: pack(iv),
      })
    )
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
        console.log("failedRequest", failedRequest.response)
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
      console.error(error)
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
