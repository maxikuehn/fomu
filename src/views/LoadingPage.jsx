import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { requestAccessToken } from "../api/spotify"
import spotifyAuthState from "../recoil/spotifyAuthState"

const LoadingPage = () => {
  let navigate = useNavigate()
  const [spotifyAuth, setSpotifyAuth] = useRecoilState(spotifyAuthState)

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code")
    requestAccessToken(code).then(() => {
      navigate("/")
    })
  }, [])

  return <div>LoadingPage</div>
}
export default LoadingPage
