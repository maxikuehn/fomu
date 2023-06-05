import { Image, Tooltip } from "antd"
import { useEffect, useState } from "react"
import _forEach from "lodash/forEach"
import { useRecoilValue, useSetRecoilState } from "recoil"
import {
  deleteTracksState,
  fullOutputPlaylistState,
  joinPlaylistState,
  listeningHistoryState,
  playerState,
  toggleDeleted,
  fullJoinPlaylistState,
} from "../../recoil"
import { ArrowRightCircle, CheckCircle, Music, PlusCircle } from "react-feather"

import api from "../../api"

const Playlist = ({ index, name, id, images, handleClick, trackContained }) => {
  return (
    <div className="flex h-auto w-full gap-2 rounded-sm border border-borderGrey px-2 py-1">
      {images.length > 0 ? (
        <img
          src={images[images.length - 1].url}
          width={52}
          height={52}
          alt="PlaylistCoverImage"
        />
      ) : (
        <div className="flex h-[52px] w-[52px] items-center justify-center bg-primary-600">
          <Music size={45} strokeWidth={1} className="stroke-primary-0" />
        </div>
      )}
      <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-lg md:max-w-[250px]">
        {name}
      </div>
      {trackContained ? (
        <div
          className="cursor-pointer self-center rounded-full stroke-green-600 hover:stroke-green-700 active:stroke-green-800"
          onClick={() => handleClick(id, index, trackContained)}
          onKeyDown={() => handleClick(id, index, trackContained)}
        >
          <CheckCircle className="stroke-inherit" size={40} strokeWidth={1.2} />
        </div>
      ) : (
        <div
          className="cursor-pointer self-center rounded-full stroke-primary-400 hover:stroke-primary-500 active:stroke-primary-600"
          onClick={() => handleClick(id, index, trackContained)}
          onKeyDown={() => handleClick(id, index, trackContained)}
        >
          <PlusCircle className="stroke-inherit" size={40} strokeWidth={1.2} />
        </div>
      )}
    </div>
  )
}

let lastTrack = ""

const PlyrPlaylistAdd = () => {
  const player = useRecoilValue(playerState)
  const deleteTrack = useRecoilValue(deleteTracksState)
  const joinPlaylist = useRecoilValue(joinPlaylistState)
  const outputPlaylists = useRecoilValue(fullOutputPlaylistState)
  const setListeningHistory = useSetRecoilState(listeningHistoryState)
  const decreaseJoinTrackTotal = useSetRecoilState(fullJoinPlaylistState)
  const [existingTracks, setExistingTracks] = useState([])
  const [trackSaved, setTrackSaved] = useState(false)

  useEffect(() => {
    if (!player || !player.item) return
    if (player.item.uri === lastTrack) return
    if (trackSaved && deleteTrack) {
      api.playlist
        .removeTracks(joinPlaylist, [lastTrack])
        .then(decreaseJoinTrackTotal)
      setTrackSaved(false)
      setListeningHistory((history) => toggleDeleted(history, lastTrack))
    }
    lastTrack = player.item.uri
  }, [player])

  useEffect(() => {
    // rome-ignore lint/complexity/noExtraSemicolon: not unnecessary
    ;(async () => {
      const _existingTracks = await Promise.all(
        outputPlaylists.map((p) => api.playlist.itemUris(p.id))
      )
      setExistingTracks(_existingTracks)
    })()
  }, [])

  const handleClick = (id, index, contained) => {
    if (contained) {
      api.playlist.removeTracks(id, [player.item.uri]).then(
        setExistingTracks((v) => {
          v[index] = v[index].filter((t) => t !== player.item.uri)
          return v
        })
      )
    } else {
      api.playlist.addTrack(id, player.item.uri, false).then(
        setExistingTracks((v) => {
          v[index] = v[index].concat(player.item.uri)
          return v
        })
      )
      setTrackSaved(true)
    }
  }

  const handleSubmit = () => {
    if (deleteTrack) {
      api.playlist
        .removeTracks(joinPlaylist, [player.item.uri])
        .then(decreaseJoinTrackTotal)
      setListeningHistory((history) => toggleDeleted(history, lastTrack))
    }
    api.player.nextTrack()
  }

  if (outputPlaylists.length === 0 || !player) return null

  return (
    <div className="flex h-full flex-col items-center gap-2 px-4">
      <span className="hidden self-start px-4 text-2xl font-semibold md:block">
        Track speichern
      </span>
      <div className="custom-scrollbar flex w-full flex-col gap-1 overflow-y-auto rounded border-2 border-primary-400 p-2 md:max-h-[50vh]">
        {outputPlaylists.map((p, i) => (
          <Playlist
            index={i}
            key={p.id}
            name={p.name}
            id={p.id}
            images={p.images}
            trackContained={existingTracks[i]?.includes(player.item?.uri)}
            handleClick={handleClick}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-col items-center self-center md:mt-6">
        <ArrowRightCircle
          onClick={handleSubmit}
          size={"60%"}
          strokeWidth={0.3}
          className="hidden cursor-pointer rounded-full stroke-primary-400 hover:stroke-primary-500 active:stroke-primary-600 md:block"
        />
        <p
          onClick={handleSubmit}
          onKeyDown={handleSubmit}
          className="cursor-pointer select-none text-2xl font-semibold text-primary-400"
        >
          {deleteTrack ? "Löschen" : "Weiter"}
        </p>
      </div>
    </div>
  )
}
export default PlyrPlaylistAdd
