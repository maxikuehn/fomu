import { atom } from "recoil"
import localStorageEffect from "./localSorageEffect"

export const spotifyAuthState = atom({
  key: "spotifyAuthState",
  default: null,
  effects: [localStorageEffect("spotify-authentication")],
})
