import { Button, Divider, Space } from "antd"
import { useEffect, useState } from "react"
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValueLoadable,
} from "recoil"
import { fetchPlayer } from "../../api/spotify"
import { playerState } from "../../recoil"
import PlyrControlls from "./PlyrControlls"
import PlyrTrack from "./PlyrTrack"

function PlyrPlayer() {
  const [player, setPlayer] = useRecoilState(playerState)
  console.log("player", player)

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPlayer().then((response) => setPlayer(response))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!player) {
    return <div className="flex-auto">Loading</div>
  }

  const { item, is_playing, progress_ms, repeat_state, shuffle_state } = player

  return (
    <div className="flex-auto flex justify-center py-5">
      <Space direction="vertical" size={"large"}>
        <PlyrTrack track={item} />
        <PlyrControlls
          isPlaying={is_playing}
          progress={progress_ms}
          duration={item.duration_ms}
          repeatState={repeat_state}
          shuffleState={shuffle_state}
        />
      </Space>
    </div>
  )
}
export default PlyrPlayer
