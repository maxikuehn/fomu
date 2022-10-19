import { atom } from "recoil"
import localStorageEffect from "./localSorageEffect"

export const outputPlaylistState = atom<string[]>({
  key: "outputPlaylistState",
  default: [],
  effects: [localStorageEffect("outputPlaylistState")],
})
