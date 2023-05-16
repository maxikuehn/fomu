import SpotifyLogin from "./components/SpotifyLogin"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { lazy, Suspense, useEffect } from "react"
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
import { checkVersion } from "./services/AppVersion"
import api from "./api"
import Footer from "./components/Footer/Footer"
import SpotifyPremiumHandler from "./components/SpotifyPremiumHandler"
import { printWelcomeMessage } from "./services/welcomeMessage"

const PlayerLayout = lazy(() => import("./views/PlayerLayout"))
const ConfiguratorLayout = lazy(() => import("./views/ConfiguratorLayout"))

const App = () => {
  const [appLoading, setAppLoading] = useRecoilState(appLoadingState)
  const app = useRecoilValue(appState)
  const setCurrentUserPlaylists = useSetRecoilState(currentUserPlaylistsState)
  const [currentUserProfile, setCurrentUserProfile] =
    useRecoilState(currentUserState)
  const setPlayer = useSetRecoilState(playerState)
  let loggedIn = !!useRecoilValue(spotifyAuthState)

  const initFetch = async () => {
    setAppLoading(true)
    setCurrentUserPlaylists((await api.playlist.currentUser()).items)
    setCurrentUserProfile(await api.user.profile())
    setPlayer(await api.player.get())
    setAppLoading(false)
  }

  useEffect(printWelcomeMessage, [])

  useEffect(() => {
    if (!loggedIn) return
    initFetch()
    if (!checkVersion()) window.location.reload()
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
    <div className="h-screen w-screen bg-background">
      {loggedIn ? (
        appLoading ? (
          <LoadingPage />
        ) : currentUserProfile?.product === "premium" ? (
          <div className="flex h-full flex-col">
            <TopBar />
            <div className="h-full">
              <Suspense fallback={<LoadingPage />}>{renderSwitch()}</Suspense>
            </div>
            <Footer />
          </div>
        ) : (
          <SpotifyPremiumHandler />
        )
      ) : (
        <SpotifyLogin />
      )}
    </div>
  )
}

export default App
