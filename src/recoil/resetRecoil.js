import { useResetRecoilState } from "recoil"
import { appState } from "./appState"
import { contextState } from "./contextState"
import { deleteTracksState } from "./deleteTracksState"
import { historyOpenState } from "./historyOpenState"
import { inputPlaylistState } from "./inputPlaylistState"
import { joinPlaylistState } from "./joinPlaylistState"
import { outputPlaylistState } from "./outputPlaylistState"
import { spotifyAuthState } from "./spotifyAuthState"

export const resetRecoil = () => {
  useResetRecoilState(appState)()
  useResetRecoilState(contextState)()
  useResetRecoilState(deleteTracksState)()
  useResetRecoilState(historyOpenState)()
  useResetRecoilState(inputPlaylistState)()
  useResetRecoilState(joinPlaylistState)()
  useResetRecoilState(outputPlaylistState)()
  useResetRecoilState(spotifyAuthState)()

  localStorage.clear()
}
