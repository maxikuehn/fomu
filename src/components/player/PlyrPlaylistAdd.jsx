import { Image, Tooltip } from "antd"
import { useEffect, useState } from "react"
import _forEach from "lodash/forEach"
import { useRecoilValue } from "recoil"
import {
  deleteTracksState,
  fullOutputPlaylistState,
  joinPlaylistState,
  playerState,
} from "../../recoil"
import { ArrowRightCircle, CheckCircle, PlusCircle } from "react-feather"
import {
  addTrackToPlaylist,
  fetchPlaylistItemUris,
  playerSkipToNext,
  removeTracksFromPlaylist,
} from "../../services/Spotify"

const Playlist = ({ index, name, id, images, handleClick, trackContained }) => {
  return (
    <div className="h-auto border-2 border-primary-500 w-full py-1 px-2 rounded-md flex gap-2">
      <Image
        src={images[0]?.url}
        width={52}
        height={52}
        preview={false}
        alt="PlaylistCoverImage"
      />
      <div className="text-ellipsis overflow-hidden max-w-xs text-lg flex-1">
        {name}
      </div>
      {trackContained ? (
        <Tooltip title="Track schon gespeichert" placement="topRight">
          <div className="self-center">
            <CheckCircle
              className="stroke-green-600"
              size={40}
              strokeWidth={1.2}
            />
          </div>
        </Tooltip>
      ) : (
        <Tooltip title="in Playlist speichern" placement="topRight">
          <div
            className="self-center rounded-full cursor-pointer stroke-primary-400 hover:stroke-primary-500 active:stroke-primary-600"
            onClick={() => handleClick(id, index)}
          >
            <PlusCircle
              className="stroke-inherit"
              size={40}
              strokeWidth={1.2}
            />
          </div>
        </Tooltip>
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
  const [existingTracks, setExistingTracks] = useState([])
  const [trackSaved, setTrackSaved] = useState(false)

  if (outputPlaylists.length === 0) return null

  useEffect(() => {
    if (player.item.uri !== lastTrack) {
      if (trackSaved && deleteTrack) {
        removeTracksFromPlaylist(joinPlaylist, [lastTrack])
        setTrackSaved(false)
      }
    }
    lastTrack = player.item.uri
  }, [player.item?.uri])

  useEffect(async () => {
    let _existingTracks = await Promise.all(
      outputPlaylists.map((p) => fetchPlaylistItemUris(p.id))
    )
    setExistingTracks(_existingTracks)
  }, [])

  const handleClick = (id, index) => {
    addTrackToPlaylist(id, player.item.uri, false).then(
      setExistingTracks((v) => {
        v[index] = v[index].concat(player.item.uri)
        return v
      })
    )
    setTrackSaved(true)
  }

  const handleSubmit = () => {
    if (deleteTrack) removeTracksFromPlaylist(joinPlaylist, [player.item.uri])
    playerSkipToNext()
  }

  if (outputPlaylists.length === 0) return null

  return (
    <div className="basis-96 p-5 flex items-center ">
      <div className="flex flex-col flex-1 gap-2 items-center">
        <span className="text-2xl font-semibold self-start px-4">
          Track speichern
        </span>
        <div className="max-h-[50vh] w-full p-2 border-4 border-primary-500 rounded-lg overflow-auto custom-scrollbar flex flex-col gap-1">
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
        <div
          className="mt-6 cursor-pointer flex flex-col items-center"
          onClick={handleSubmit}
        >
          <ArrowRightCircle
            size={"60%"}
            strokeWidth={0.3}
            className="stroke-primary-400 hover:stroke-primary-500 active:stroke-primary-600"
          />
          <p className="text-primary-400 text-2xl font-semibold select-none">
            {deleteTrack ? "Löschen" : "Weiter"}
          </p>
        </div>
      </div>
    </div>
  )
}
export default PlyrPlaylistAdd
