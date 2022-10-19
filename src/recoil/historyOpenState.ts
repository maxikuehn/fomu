import { atom } from "recoil"
import localStorageEffect from "./localSorageEffect"

export const historyOpenState = atom<boolean>({
  key: "historyOpenState",
  default: false,
  effects: [localStorageEffect("historyOpenState")],
})
