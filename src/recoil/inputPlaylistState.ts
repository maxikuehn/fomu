import { atom } from "recoil"
import localStorageEffect from "./localSorageEffect"

export const inputPlaylistState = atom<string[]>({
  key: "inputPlaylistState",
  default: [],
  effects: [localStorageEffect("inputPlaylistState")],
})
