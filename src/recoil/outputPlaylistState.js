import { atom } from "recoil"
import localStorageEffect from "./localSorageEffect"

export const outputPlaylistState = atom({
  key: "outputPlaylistState",
  default: [],
  effects: [localStorageEffect("outputPlaylistState")],
})
