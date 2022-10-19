import { atom } from "recoil"
import localStorageEffect from "./localSorageEffect"

export const joinPlaylistState = atom<string>({
  key: "joinPlaylistState",
  default: "",
  effects: [localStorageEffect("joinPlaylistState")],
})
