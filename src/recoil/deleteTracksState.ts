import { atom } from "recoil"
import localStorageEffect from "./localSorageEffect"

export const deleteTracksState = atom<boolean>({
  key: "deleteTracksState",
  default: true,
  effects: [localStorageEffect("deleteTracksState")],
})
