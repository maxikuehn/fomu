import { atom } from "recoil"
import localStorageEffect from "./localSorageEffect"

interface AuthState {
  access_token: string
  name: string
}

export const spotifyAuthState = atom<AuthState | undefined>({
  key: "spotifyAuthState",
  default: undefined,
  effects: [localStorageEffect("spotify-authentication")],
})
