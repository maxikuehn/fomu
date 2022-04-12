import { atom } from "recoil"
import localStorageEffect from "./localSorageEffect"

export const contextState = atom({
  key: "contextState",
  default: "",
  effects: [localStorageEffect("contextState")],
})
