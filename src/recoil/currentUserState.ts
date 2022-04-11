import { atom } from "recoil"
import { sp_profile } from "../types"

export const currentUserState = atom<sp_profile | null>({
  key: "currentUserProfileState",
  default: null,
})
