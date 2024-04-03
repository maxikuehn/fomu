import { Typography } from "antd"
import { useRecoilValue } from "recoil"
import { fullJoinPlaylistState, playerState } from "../../recoil"
const { Text } = Typography

const StyledItem = ({ position, isPlaying }) => (
  <div
    className={
      "absolute bottom-0 w-[3px] animate-music-playing rounded-t-full shadow-inner shadow-spotify-green"
    }
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
      className="flex flex-row items-center space-x-1 cursor-pointer"
      onClick={() => window.open(uri, "_self")}
      onKeyDown={() => window.open(uri, "_self")}
    >
      <div id="PlayAnimationContainer" className="relative h-5 w-5">
        {Array.from({ length: 4 }).map((_, pos) => (
          <StyledItem
            // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={pos}
            position={pos}
            isPlaying={Boolean(player.is_playing) && player.context?.uri === uri}
          />
        ))}
      </div>
      <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
        {name}
      </div>
      <Text keyboard className="whitespace-nowrap opacity-80">
        {tracks.total} {`Track${tracks.total !== 1 ? "s" : ""}`}
      </Text>
    </div>
  )
}
export default PlyrCurrentlyPlayedPlaylist
