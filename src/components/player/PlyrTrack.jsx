import React from "react"
import { Mic } from "react-feather"
import { mobileState } from "../../recoil"
import { useRecoilValue } from "recoil"
import api from "../../api"

const PlyrTrack = ({ track, isPlaying }) => {
  const { album } = track
  const mobile = useRecoilValue(mobileState)

  return album ? (
    <img
      src={album.images[0].url}
      alt="CurrentTrackCoverImage"
      className="aspect-square h-16 md:h-fit"
      onClick={() => {
        if (!mobile) return
        if (isPlaying) api.player.pause()
        else api.player.play()
      }}
      onKeyDown={() => {
        if (!mobile) return
        if (isPlaying) api.player.pause()
        else api.player.play()
      }}
    />
  ) : (
    <div className="flex h-[60vh] w-[60vh] items-center justify-center">
      <Mic size={"50%"} strokeWidth={0.3} className="stroke-primary-600" />
    </div>
  )
}

export default PlyrTrack
