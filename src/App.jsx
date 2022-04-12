import SpotifyLogin from "./components/SpotifyLogin"
import PlayerLayout from "./views/PlayerLayout"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  fetchCurrentUserPlaylist,
  fetchCurrentUserProfile,
  fetchPlayer,
} from "./api/spotify"
import { useEffect, useState } from "react"
import ConfiguratorLayout from "./views/ConfiguratorLayout"
import TopBar from "./components/TopBar"
import LoadingPage from "./views/LoadingPage"
import { EAppState } from "./types"
import {
  appLoadingState,
  appState,
  currentUserPlaylistsState,
  currentUserState,
  playerState,
  spotifyAuthState,
} from "./recoil"

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === "development"

function App() {
  const [appLoading, setAppLoading] = useRecoilState(appLoadingState)
  const [app, setApp] = useRecoilState(appState)
  const setCurrentUserPlaylists = useSetRecoilState(currentUserPlaylistsState)
  const setCurrentUserProfile = useSetRecoilState(currentUserState)
  const setPlayer = useSetRecoilState(playerState)
  let loggedIn = !!useRecoilValue(spotifyAuthState)

  const initFetch = async () => {
    setAppLoading(true)
    setCurrentUserPlaylists((await fetchCurrentUserPlaylist()).items)
    setCurrentUserProfile(await fetchCurrentUserProfile())
    setPlayer(await fetchPlayer())
    setAppLoading(false)
  }

  useEffect(() => {
    if (!loggedIn) return
    initFetch()
  }, [loggedIn, app])

  const renderSwitch = () => {
    switch (app) {
      case EAppState.Configuration:
        return <ConfiguratorLayout />
      case EAppState.Player:
        return <PlayerLayout />
    }
  }

  return (
    <div className="w-screen h-screen bg-background">
      {loggedIn ? (
        appLoading ? (
          <LoadingPage />
        ) : (
          <div className="flex flex-col h-full">
            <TopBar />
            {renderSwitch()}
          </div>
        )
      ) : (
        <SpotifyLogin />
      )}
    </div>
  )
}

export default App
