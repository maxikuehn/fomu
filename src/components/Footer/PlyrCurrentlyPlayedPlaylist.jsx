import { Typography } from "antd"
import { useRecoilValue } from "recoil"
import { fullJoinPlaylistState, playerState } from "../../recoil"
const { Text } = Typography

const StyledItem = ({ position, isPlaying }) => (
  <div
    className={`absolute rounded-t-full bottom-0 w-[3px] animate-music-playing shadow-inner shadow-spotify-green`}
    style={{
      left: `${position * 5}px`,
      animationDelay: `${position * -777}ms`,
      animationPlayState: `${isPlaying ? "running" : "paused"}`,
    }}
  />
)

const PlyrCurrentlyPlayedPlaylist = () => {
  const fullJoinPlaylist = useRecoilValue(fullJoinPlaylistState)
  const player = useRecoilValue(playerState)

  if (!fullJoinPlaylist || !player) return null
  const { name, tracks, uri } = fullJoinPlaylist

  return (
    <div
      className="flex flex-row space-x-1 items-center hover:cursor-pointer"
      onClick={() => window.open(uri, "_self")}
    >
      <div id="PlayAnimationContainer" className="relative w-5 h-5">
        {Array.from({ length: 4 }).map((_, pos) => (
          <StyledItem
            key={pos}
            position={pos}
            isPlaying={!!player.is_playing}
          />
        ))}
      </div>
      <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
        {name}
      </div>
      <Text keyboard className="whitespace-nowrap opacity-80">
        {tracks.total} {`Track${tracks.total !== 1 ? "s" : ""}`}
      </Text>
    </div>
  )
}
export default PlyrCurrentlyPlayedPlaylist
