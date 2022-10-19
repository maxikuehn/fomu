import { resetRecoil } from "recoil-nexus"
import { appState } from "./appState"
import { contextState } from "./contextState"
import { deleteTracksState } from "./deleteTracksState"
import { historyOpenState } from "./historyOpenState"
import { inputPlaylistState } from "./inputPlaylistState"
import { joinPlaylistState } from "./joinPlaylistState"
import { outputPlaylistState } from "./outputPlaylistState"
import { spotifyAuthState } from "./spotifyAuthState"

export const resetStates = () => {
  resetRecoil(appState)
  resetRecoil(contextState)
  resetRecoil(deleteTracksState)
  resetRecoil(historyOpenState)
  resetRecoil(inputPlaylistState)
  resetRecoil(joinPlaylistState)
  resetRecoil(outputPlaylistState)
  resetRecoil(spotifyAuthState)

  localStorage.clear()
}
