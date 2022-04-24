import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { fetchPlayer } from "../../services/Spotify"
import { playerState } from "../../recoil"
import PlyrControlls from "./PlyrControlls"
import PlyrTrack from "./PlyrTrack"

function PlyrPlayer() {
  const [player, setPlayer] = useRecoilState(playerState)

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPlayer().then((response) => {
        setPlayer(response)
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!player) {
    return <div className="flex-auto">Loading</div>
  }

  const { item, is_playing, progress_ms, repeat_state, shuffle_state } = player

  return (
    <div className="flex-auto flex justify-center py-5">
      <div className="flex flex-col justify-between gap-12 mb-4 w-[60vh]">
        <PlyrTrack track={item || {}} />
        <PlyrControlls
          isPlaying={is_playing}
          progress={progress_ms}
          duration={item?.duration_ms}
          repeatState={repeat_state}
          shuffleState={shuffle_state}
        />
      </div>
    </div>
  )
}
export default PlyrPlayer
