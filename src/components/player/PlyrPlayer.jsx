import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  contextState,
  listeningHistoryState,
  playerState,
  triggerPlayerUpdateState,
} from "../../recoil"
import PlyrControlls from "./PlyrControlls"
import PlyrTrack from "./PlyrTrack"
import api from "../../api"
import PlyrTrackInfo from "./PlyrTrackInfo"

let lastTrack = ""

function PlyrPlayer() {
  const [player, setPlayer] = useRecoilState(playerState)
  const [listeningHistory, setListeningHistory] = useRecoilState(
    listeningHistoryState
  )
  const context = useRecoilValue(contextState)
  const [triggerPlayerUpdate, setTriggerPlayerUpdate] = useRecoilState(
    triggerPlayerUpdateState
  )

  useEffect(() => {
    const interval = setInterval(() => {
      api.player.get().then((response) => {
        setPlayer(response)
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (triggerPlayerUpdate) {
      setTriggerPlayerUpdate(false)
      setTimeout(() => {
        api.player.get().then((response) => {
          setPlayer(response)
        })
      }, 300)
    }
  }, [triggerPlayerUpdate])

  useEffect(() => {
    if (!player) return
    if (!player.item) return
    if (!player.context) return
    const { item } = player
    if (lastTrack === item.uri) return
    if (context !== player.context.uri) return

    lastTrack = item.uri

    const index = listeningHistory.findIndex((t) => t.uri === item.uri)
    if (index === 0) return

    setListeningHistory((oldHistory) => {
      const history = [...oldHistory]
      const element =
        index > -1
          ? history.splice(index, 1)[0]
          : {
              uri: item.uri,
              name: item.name,
              artists: item.artists.map((artist) => ({
                uri: artist.uri,
                name: artist.name,
              })),
              image: item.album.images[item.album.images.length - 1].url,
              deleted: false,
            }
      return [element, ...history]
    })
  }, [player?.item])

  if (!player) {
    return <div className="flex-auto">Loading</div>
  }

  const { item, is_playing, progress_ms, repeat_state, shuffle_state } = player

  console.log("is_playing", is_playing)

  return (
    <div className="flex flex-col justify-center gap-2 p-2 md:max-w-[640px] md:flex-1 md:gap-10">
      <div className="flex gap-2 md:flex-col">
        <PlyrTrack track={item || {}} isPlaying={is_playing} />
        <PlyrTrackInfo track={item || {}} />
      </div>
      <PlyrControlls
        isPlaying={is_playing}
        progress={progress_ms}
        duration={item?.duration_ms}
        repeatState={repeat_state}
        shuffleState={shuffle_state}
      />
    </div>
  )
}
export default PlyrPlayer
