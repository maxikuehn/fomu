import { atom } from "recoil"
import { sp_profile } from "../types"
import localStorageEffect from "./localSorageEffect"

export const currentUserState = atom<sp_profile | null>({
  key: "currentUserProfileState",
  default: null,
  effects: [localStorageEffect("currentUser")],
})
