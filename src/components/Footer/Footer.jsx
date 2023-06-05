import PlyrCurrentlyPlayedPlaylist from "./PlyrCurrentlyPlayedPlaylist"
import SpotifyLogo from "../../assets/images/Spotify_Logo_RGB_White.png"

const Footer = () => {
  const handleClick = () => {
    window.open("https://spotify.com/", "_blank")
  }

  return (
    <div
      className="z-10 flex h-12 w-full items-end space-x-2 px-4 py-3"
      id="footer"
    >
      <PlyrCurrentlyPlayedPlaylist />
      <div className="flex-1" />
      <img
        src={SpotifyLogo}
        alt="Spotify Logo"
        draggable={false}
        className="hidden h-full cursor-pointer md:block"
        onClick={handleClick}
        onKeyDown={handleClick}
      />
    </div>
  )
}
export default Footer
