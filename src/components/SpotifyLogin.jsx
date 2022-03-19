import { useEffect } from "react"
import Button from "./Button"
import { requestUserAuthorization } from "../api/spotify"

const SpotifyLogin = (props) => {
  const handleClick = () => {
    requestUserAuthorization()
  }

  return (
    <div>
      <Button handleClick={handleClick} label="Login" />
    </div>
  )
}
export default SpotifyLogin
