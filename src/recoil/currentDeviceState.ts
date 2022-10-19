import { atom } from "recoil"

export const currentDeviceState = atom<string>({
  key: "currentDeviceState",
  default: "",
})
