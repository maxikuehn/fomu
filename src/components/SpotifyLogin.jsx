import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import { requestUserAuthorization } from "../services/Spotify"

const SpotifyLogin = () => {
  let navigate = useNavigate()

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
