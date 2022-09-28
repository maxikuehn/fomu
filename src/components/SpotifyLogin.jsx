import { Button } from "antd"
import { requestUserAuthorization } from "../services/Spotify"

const REDIRECT_BASE = JSON.parse(import.meta.env.VITE_SP_REDIRECT_BASE ?? "[]")

const SpotifyLogin = () => {
  const handleClick = () => {
    const href = window.location.href
    if (Array.isArray(REDIRECT_BASE) && REDIRECT_BASE.includes(href))
      requestUserAuthorization(href)
    else
      console.error("Redirect base not valid.", REDIRECT_BASE)
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Button onClick={handleClick} type="primary" size="large">
        Login with Spotify
      </Button>
    </div>
  )
}
export default SpotifyLogin
