import api from "../api"
import SpotifyIcon from "../assets/images/Spotify_Icon_RGB_Green.png"

const SpotifyLogin = () => {
  const handleClick = () => api.token.requestAuthorization()

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        id="login-button"
        onClick={handleClick}
        className="bg-white transition ease-[cubic-bezier(0.7,0,0.32,1.7)] duration-500 rounded-full
        hover:shadow-spotify-green hover:shadow-[inset_0_0_0_10px,0px_10px_70px_-5px] p-8 cursor-pointer flex items-center space-x-4"
      >
        <img src={SpotifyIcon} alt="Spotify Logo" className="h-20" />
        <span className="text-black font-metro font-medium text-4xl">
          Mit Spotify verbinden
        </span>
      </div>
    </div>
  )
}
export default SpotifyLogin
