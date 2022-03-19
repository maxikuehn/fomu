import SpotifyLogin from "./components/SpotifyLogin"
import PlayerLayout from "./views/PlayerLayout"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import spotifyAuthState from "./recoil/spotifyAuthState"
import { currentUserPlaylistsState } from "./recoil/currentUserPlaylistsState"
import {
  fetchCurrentUserPlaylist,
  fetchCurrentUserProfile,
} from "./api/spotify"
import { appLoadingState } from "./recoil/appLoadingState"
import { useEffect, useState } from "react"
import ConfiguratorLayout from "./views/ConfiguratorLayout"
import TopBar from "./components/TopBar"
import currentUserProfileState from "./recoil/currentUserState"
import LoadingPage from "./views/LoadingPage"

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === "development"

function App() {
  const [appLoading, setAppLoading] = useRecoilState(appLoadingState)
  const [configurating, setConfigurating] = useState(true)
  const setCurrentUserPlaylists = useSetRecoilState(currentUserPlaylistsState)
  const setCurrentUserProfile = useSetRecoilState(currentUserProfileState)
  let loggedIn = !!useRecoilValue(spotifyAuthState)

  useEffect(() => {
    if (!loggedIn) return
    setAppLoading(true)
    Promise.all([
      fetchCurrentUserPlaylist().then(setCurrentUserPlaylists),
      fetchCurrentUserProfile().then(setCurrentUserProfile),
    ]).then(() => setAppLoading(false))
  }, [loggedIn])

  return (
    <div className="w-screen h-screen bg-background">
      {loggedIn ? (
        appLoading ? (
          <LoadingPage />
        ) : (
          <div className="flex flex-col h-full">
            <TopBar />
            {configurating ? (
              <ConfiguratorLayout
                finishConfig={() => setConfigurating(false)}
              />
            ) : (
              <PlayerLayout />
            )}
          </div>
        )
      ) : (
        <SpotifyLogin />
      )}
    </div>
  )
}

export default App
