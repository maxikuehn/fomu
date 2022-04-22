import React, { memo, useEffect, useState } from "react"
import { Image, Space } from "antd"
import heartInactive from "./../../assets/icons/heart-64.png"
import heartActive from "./../../assets/icons/heart-64-active.png"
import {
  checkUserSaveTrackId,
  removeTrackCurrentUser,
  saveTrackCurrentUser,
} from "../../services/spotify"

const PlyrTrack = ({ track }) => {
  const [liked, setLiked] = useState(false)
  if (!track) {
    return <div />
  }
  const { name, artists, album, id } = track

  useEffect(() => {
    checkUserSaveTrackId(id).then((res) => {
      setLiked(res)
      console.log("res", res)
    })
  }, [track])

  const handleClickLike = () => {
    if (liked) removeTrackCurrentUser(id)
    else saveTrackCurrentUser(id)
    setLiked(!liked)
  }

  return (
    <Space direction="vertical">
      <Image
        src={album.images[0].url}
        preview={false}
        width={"60vh"}
        height={"60vh"}
        alt="CurrentTrackCoverImage"
      />
      <div className="flex justify-between items-center">
        <Space direction="vertical" size={0}>
          <span
            onClick={() => (window.location.href = track.uri)}
            className="cursor-pointer font-semibold underline decoration-transparent hover:decoration-primary-300 hover:text-primary-300 transition-all duration-300"
          >
            {name}
          </span>
          <div>
            {artists
              .map((a, i) => (
                <span
                  onClick={() => (window.location.href = a.uri)}
                  className="cursor-pointer underline decoration-transparent hover:decoration-primary-300 hover:text-primary-300 transition-all duration-300"
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

const areEqual = (prev, next) => prev.track.id === next.track.id

export default memo(PlyrTrack, areEqual)
