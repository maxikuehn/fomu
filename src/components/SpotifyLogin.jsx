import { Button } from "antd"
import { requestUserAuthorization } from "../api/spotify"

const SpotifyLogin = (props) => {
  const handleClick = () => {
    requestUserAuthorization()
  }

  return (
    <Button onClick={handleClick} type="primary">
      Login
    </Button>
  )
}
export default SpotifyLogin
