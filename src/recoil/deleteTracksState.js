import { atom } from "recoil"
import localStorageEffect from "./localSorageEffect"

export const deleteTracksState = atom({
  key: "deleteTracksState",
  default: false,
  effects: [localStorageEffect("deleteTracksState")],
})
