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
    <Space direction="vertical">
      {album ? (
        <Image
          src={album.images[0].url}
          preview={false}
          alt="CurrentTrackCoverImage"
        />
      ) : (
        <div className="flex h-[60vh] w-[60vh] items-center justify-center">
          <Mic size={"50%"} strokeWidth={0.3} className="stroke-primary-600" />
        </div>
      )}
      <div className="flex items-center justify-between">
        <Space direction="vertical" size={0}>
          <span
            onClick={() => window.open(track.uri, "_self")}
            className="cursor-pointer text-base font-semibold underline decoration-transparent transition-all duration-300 hover:text-primary-300 hover:decoration-primary-300"
          >
            {name}
          </span>
          <div>
            {artists
              .map((a, i) => (
                <span
                  onClick={() => window.open(a.uri, "_self")}
                  className="cursor-pointer text-sm underline decoration-transparent transition-all duration-300 hover:text-primary-300 hover:decoration-primary-300"
                  key={i}
                >
                  {a.name}
                </span>
              ))
              .reduce((prev, curr) => [prev, ", ", curr])}
          </div>
        </Space>
        <Image
          alt="likeHeart"
          height={35}
          width={35}
          className="cursor-pointer hover:brightness-90 active:brightness-75"
          src={liked ? heartActive : heartInactive}
          onClick={handleClickLike}
          preview={false}
        />
      </div>
    </Space>
  )
}

const areEqual = (prev, next) => {
  return prev.track?.id === next.track?.id
}

export default memo(PlyrTrack, areEqual)
