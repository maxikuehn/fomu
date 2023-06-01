import { Image, Typography } from "antd"
import PlyrCurrentlyPlayedPlaylist from "./PlyrCurrentlyPlayedPlaylist"
import SpotifyLogo from "../../assets/images/Spotify_Logo_RGB_White.png"

const Footer = () => {
  return (
    <div className="z-10 flex h-12 w-full items-end space-x-2 px-4 py-3">
      <PlyrCurrentlyPlayedPlaylist />
      <div className="flex-1" />
      <Image
        src={SpotifyLogo}
        alt="Spotify Logo"
        height={24}
        preview={false}
        draggable={false}
        className="hidden cursor-pointer md:block"
        onClick={() => window.open("https://spotify.com/", "_blank")}
      />
    </div>
  )
}
export default Footer
