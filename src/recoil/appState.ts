import { atom } from "recoil"
import { EAppState } from "../types"
import localStorageEffect from "./localSorageEffect"

export const appState = atom<EAppState>({
  key: "appState",
  default: EAppState.Configuration,
  effects: [localStorageEffect("appState")],
})
