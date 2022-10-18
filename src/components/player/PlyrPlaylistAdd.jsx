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
} from "../../recoil"
import { ArrowRightCircle, CheckCircle, Music, PlusCircle } from "react-feather"

import api from "../../api"

const Playlist = ({ index, name, id, images, handleClick, trackContained }) => {
  return (
    <div className="h-auto border border-borderGrey w-full py-1 px-2 rounded-sm flex gap-2">
      {images.length > 0 ? (
        <Image
          src={images[images.length - 1].url}
          width={52}
          height={52}
          preview={false}
          alt="PlaylistCoverImage"
        />
      ) : (
        <div className="w-[52px] h-[52px] bg-primary-600 flex items-center justify-center">
          <Music size={45} strokeWidth={1} className="stroke-primary-0" />
        </div>
      )}
      <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[250px] text-lg flex-1">
        {name}
      </div>
      {trackContained ? (
        <div className="self-center">
          <CheckCircle
            className="stroke-green-600"
            size={40}
            strokeWidth={1.2}
          />
        </div>
      ) : (
        <div
          className="self-center rounded-full cursor-pointer stroke-primary-400 hover:stroke-primary-500 active:stroke-primary-600"
          onClick={() => handleClick(id, index)}
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
  const [existingTracks, setExistingTracks] = useState([])
  const [trackSaved, setTrackSaved] = useState(false)

  useEffect(() => {
    if (!player || !player.item) return
    if (player.item.uri === lastTrack) return
    if (trackSaved && deleteTrack) {
      api.playlist.removeTracks(joinPlaylist, [lastTrack])
      setTrackSaved(false)
      setListeningHistory((history) => toggleDeleted(history, lastTrack))
    }
    lastTrack = player.item.uri
  }, [player])

  useEffect(() => {
    ;(async () => {
      let _existingTracks = await Promise.all(
        outputPlaylists.map((p) => api.playlist.itemUris(p.id))
      )
      setExistingTracks(_existingTracks)
    })()
  }, [])

  const handleClick = (id, index) => {
    api.playlist.addTrack(id, player.item.uri, false).then(
      setExistingTracks((v) => {
        v[index] = v[index].concat(player.item.uri)
        return v
      })
    )
    setTrackSaved(true)
  }

  const handleSubmit = () => {
    if (deleteTrack) {
      api.playlist.removeTracks(joinPlaylist, [player.item.uri])
      setListeningHistory((history) => toggleDeleted(history, lastTrack))
    }
    api.player.nextTrack()
  }

  if (outputPlaylists.length === 0 || !player) return null

  return (
    <div className="basis-96 p-5 flex items-center" id="PlayerPlaylistAdd">
      <div className="flex flex-col flex-1 gap-2 items-center">
        <span className="text-2xl font-semibold self-start px-4">
          Track speichern
        </span>
        <div className="max-h-[50vh] w-full p-2 border-2 border-primary-400 rounded overflow-auto custom-scrollbar flex flex-col gap-1">
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
        <div className="mt-6 flex flex-col items-center self-center">
          <ArrowRightCircle
            onClick={handleSubmit}
            size={"60%"}
            strokeWidth={0.3}
            className="stroke-primary-400 hover:stroke-primary-500 active:stroke-primary-600 cursor-pointer rounded-full"
          />
          <p
            onClick={handleSubmit}
            className="text-primary-400 text-2xl font-semibold select-none cursor-pointer"
          >
            {deleteTrack ? "Löschen" : "Weiter"}
          </p>
        </div>
      </div>
    </div>
  )
}
export default PlyrPlaylistAdd
