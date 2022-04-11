import { atom } from "recoil"
import localStorageEffect from "./localSorageEffect"

export const joinPlaylistState = atom({
  key: "joinPlaylistState",
  default: "",
  effects: [localStorageEffect("joinPlaylistState")],
})
