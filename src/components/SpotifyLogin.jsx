import { Button } from "antd"
import api from "../api"

const SpotifyLogin = () => {
  const handleClick = () => {
    const redirectUri = api.token.authorizeUri()
    window.location.href = redirectUri
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
