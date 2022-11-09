import api from "../api"
import SpotifyIcon from "../assets/images/Spotify_Icon_RGB_Green.png"

const SpotifyLogin = () => {
  const handleClick = () => api.token.requestAuthorization()

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        id="login-button"
        onClick={handleClick}
        className="flex cursor-pointer select-none items-center space-x-4 rounded-full bg-white p-8 transition
        duration-500 ease-[cubic-bezier(0.7,0,0.32,1.7)] hover:shadow-[inset_0_0_0_10px,0px_10px_70px_-5px] hover:shadow-spotify-green"
      >
        <img
          src={SpotifyIcon}
          alt="Spotify Logo"
          className="h-20"
          draggable={false}
        />
        <span className="font-metro text-4xl font-medium text-black">
          Mit Spotify verbinden
        </span>
      </div>
    </div>
  )
}
export default SpotifyLogin
