import { atom } from "recoil"

const currentUserProfileState = atom({
  key: "currentUserProfileState",
  default: null,
})

export default currentUserProfileState
