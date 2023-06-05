import React, { memo } from "react"
import { Mic } from "react-feather"

const PlyrTrack = ({ track }) => {
  const { album } = track

  return album ? (
    <img
      src={album.images[0].url}
      alt="CurrentTrackCoverImage"
      className="aspect-square h-16 md:h-fit"
    />
  ) : (
    <div className="flex h-[60vh] w-[60vh] items-center justify-center">
      <Mic size={"50%"} strokeWidth={0.3} className="stroke-primary-600" />
    </div>
  )
}

const areEqual = (prev, next) => {
  return prev.track?.id === next.track?.id
}

export default memo(PlyrTrack, areEqual)
