import { Button } from "antd"
import { requestUserAuthorization } from "../services/Spotify"

const SpotifyLogin = () => {
  const handleClick = () => {
    const href = window.location.href
    requestUserAuthorization(href)
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
