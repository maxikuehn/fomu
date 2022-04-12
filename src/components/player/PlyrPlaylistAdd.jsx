import { Button, Image, Space } from "antd"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import {
  deleteTracksState,
  fullOutputPlaylistState,
  joinPlaylistState,
  playerState,
} from "../../recoil"
import { ArrowRightCircle, CheckCircle, XCircle } from "react-feather"
import _forEach from "lodash/forEach"
import {
  addTrackToPlaylist,
  playerSkipToNext,
  removeTracksFromPlaylist,
} from "../../api/spotify"

const Playlist = ({ name, id, images, selected, handleClick }) => {
  return (
    <Button
      type={selected ? "primary" : "default"}
      style={{ height: "auto", width: "100%" }}
      onClick={() => handleClick(id)}
    >
      <div className="flex gap-2 py-1">
        <Image src={images[0]?.url} width={52} height={52} preview={false} />
        <Space direction="vertical" className="flex-1 text-left ">
          <div className="text-ellipsis overflow-hidden max-w-xs text-lg">
            {name}
          </div>
          {/* <Space>{selected ? "added" : "add"}</Space> */}
        </Space>
      </div>
    </Button>
  )
}

const PlyrPlaylistAdd = () => {
  const outputPlaylists = useRecoilValue(fullOutputPlaylistState)
  const deleteTrack = useRecoilValue(deleteTracksState)
  const player = useRecoilValue(playerState)
  const joinPlaylist = useRecoilValue(joinPlaylistState)
  const [selected, setSelected] = useState([])

  const handleClick = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  const handleSubmit = () => {
    console.log("selected", selected, player)
    _forEach(selected, (id) => {
      addTrackToPlaylist(id, player.item.uri)
    })
    if (deleteTrack) removeTracksFromPlaylist(joinPlaylist, [player.item.uri])
    playerSkipToNext()
    setSelected([])
  }

  return (
    <div className="basis-96 p-5 flex items-center ">
      <div className="flex flex-col flex-1 gap-4 border- border-yellow-500 items-center">
        {outputPlaylists.map((p) => (
          <Playlist
            key={p.id}
            name={p.name}
            id={p.id}
            images={p.images}
            selected={selected.includes(p.id)}
            handleClick={handleClick}
          />
        ))}
        <div
          className="py-10 cursor-pointer text-2xl font-semibold"
          onClick={handleSubmit}
        >
          {selected.length > 0 ? (
            <div className="stroke-green-600 hover:stroke-green-700 active:stroke-green-800 flex flex-col items-center">
              <CheckCircle
                size={250}
                strokeWidth={0.7}
                className="stroke-inherit"
              />
              <p className="text-green-600">Speichern</p>
            </div>
          ) : deleteTrack ? (
            <div className="stroke-red-600 hover:stroke-red-700 active:stroke-red-800 flex flex-col items-center">
              <XCircle
                size={250}
                strokeWidth={0.7}
                className="stroke-inherit"
              />
              <p className="text-red-600 ">Löschen</p>
            </div>
          ) : (
            <div className="stroke-slate-600 hover:stroke-slate-700 active:stroke-slate-800 flex flex-col items-center">
              <ArrowRightCircle
                size={250}
                strokeWidth={0.7}
                className="stroke-inherit"
              />
              <p className="text-slate-600 ">Skip</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default PlyrPlaylistAdd
