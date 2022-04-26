import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { fetchPlayer } from "../../services/Spotify"
import { contextState, listeningHistoryState, playerState } from "../../recoil"
import PlyrControlls from "./PlyrControlls"
import PlyrTrack from "./PlyrTrack"

let lastTrack = ""

function PlyrPlayer() {
  const [player, setPlayer] = useRecoilState(playerState)
  const [listeningHistory, setListeningHistory] = useRecoilState(
    listeningHistoryState
  )
  const context = useRecoilValue(contextState)

  useEffect(() => {
    console.log("listeningHistory", listeningHistory)
  }, [listeningHistory])

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

  useEffect(() => {
    if (lastTrack === item.uri) return
    if (context !== player.context.uri) return
    if (!listeningHistory.find((track) => track.uri === item.uri)) {
      setListeningHistory((listeningHistory) => [
        {
          uri: item.uri,
          name: item.name,
          artistNames: item.artists.map((artist) => artist.name),
          image: item.album.images[item.album.images.length - 1].url,
          deleted: false,
        },
        ...listeningHistory,
      ])
    }
    lastTrack = item.uri
  }, [item])

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
