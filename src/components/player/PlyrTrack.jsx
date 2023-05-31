import React, { memo, useEffect, useState } from "react"
import { Image, Space } from "antd"
import heartInactive from "./../../assets/icons/heart-64.png"
import heartActive from "./../../assets/icons/heart-64-active.png"
import { Mic } from "react-feather"
import api from "../../api"

const PlyrTrack = ({ track }) => {
  const [liked, setLiked] = useState(false)

  useEffect(
    () => async () => {
      if (!track.id) return
      setLiked(await api.track.isSaved(track.id))
    },
    [track]
  )

  const handleClickLike = () => {
    if (liked) {
      api.track.removeTrack(id)
      setLiked(false)
    } else {
      api.track.saveTrack(id)
      setLiked(true)
    }
  }

  const {
    name = "podcast beste! aber funktioniert hier leider nicht..",
    artists = [{ uri: "", name: "" }],
    album,
    id = "podcast",
  } = track

  return (
    album ? (
      <img
        src={album.images[0].url}
        alt="CurrentTrackCoverImage"
        className="h-16 md:h-fit aspect-square"
      />
    ) : (
      <div className="flex h-[60vh] w-[60vh] items-center justify-center">
        <Mic size={"50%"} strokeWidth={0.3} className="stroke-primary-600" />
      </div>
    )
  )
}

const areEqual = (prev, next) => {
  return prev.track?.id === next.track?.id
}

export default memo(PlyrTrack, areEqual)
