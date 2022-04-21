import { atom, selector } from "recoil"
import { fetchPlayer } from "../services/Spotify"

export const playerState = atom({
  key: "playerState",
  default: null,
})
