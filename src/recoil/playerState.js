import { atom, selector } from "recoil"
import { fetchPlayer } from "../api/spotify"

export const playerState = atom({
  key: "playerState",
  default: null,
})
