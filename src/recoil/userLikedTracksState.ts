import { atom } from "recoil"

export const userLikedTracksState = atom<string[]>({
  key: "userLikedTracksState",
  default: [],
})
