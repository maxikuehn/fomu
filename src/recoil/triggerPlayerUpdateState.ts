import { atom } from "recoil"

export const triggerPlayerUpdateState = atom<boolean>({
  key: "triggerPlayerUpdateState",
  default: false,
})
