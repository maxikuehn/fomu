import { Image, Typography } from "antd"
import PlyrCurrentlyPlayedPlaylist from "./PlyrCurrentlyPlayedPlaylist"
import SpotifyLogo from "../../assets/images/Spotify_Logo_RGB_White.png"

const Footer = () => {
  return (
    <div className="z-10 w-full px-4 py-3 flex h-12 items-end space-x-2">
      <PlyrCurrentlyPlayedPlaylist />
      <div className="flex-1" />
      <Image
        src={SpotifyLogo}
        alt="Spotify Logo"
        height={24}
        preview={false}
        draggable={false}
        className="cursor-pointer"
        onClick={() => window.open("https://spotify.com/", "_blank")}
      />
    </div>
  )
}
export default Footer
