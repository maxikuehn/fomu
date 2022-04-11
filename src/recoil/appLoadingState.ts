import { atom } from "recoil"

export const appLoadingState = atom<boolean>({
  key: "appLoadingState",
  default: false,
})
