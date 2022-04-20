import { Button } from "antd"
import { requestUserAuthorization } from "../api/spotify"

const SpotifyLogin = (props) => {
  const handleClick = () => {
    requestUserAuthorization()
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
