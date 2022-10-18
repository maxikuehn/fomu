import { atom } from "recoil"
import localStorageEffect from "./localSorageEffect"

interface AuthState {
  access_token: string
  refresh_token: string
  expires_in: number
  scope: string
  token_type: string
}

export const spotifyAuthState = atom<AuthState | undefined>({
  key: "spotifyAuthState",
  default: undefined,
  effects: [localStorageEffect("spotify-authentication")],
})
