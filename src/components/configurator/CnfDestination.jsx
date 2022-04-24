import { PlusOutlined } from "@ant-design/icons"
import { Badge, Button, Input } from "antd"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { createPlaylist } from "../../services/Spotify"
import {
  currentUserOwnedPlaylistState,
  currentUserState,
  outputPlaylistState,
} from "../../recoil"
import CnfPlaylist from "./CnfPlaylist"

const CnfDestination = () => {
  const ownedPlaylists = useRecoilValue(currentUserOwnedPlaylistState)
  const currentUser = useRecoilValue(currentUserState)
  const outputPlaylists = useRecoilValue(outputPlaylistState)
  const [newPlaylistName, setNewPlaylistName] = useState("")

  const handleAddPlaylist = async () => {
    if (newPlaylistName === "") return
    await createPlaylist(currentUser.id, newPlaylistName)
    location.reload()
  }

  return (
    <div className="max-h-[85vh] max-w-[400px] flex-1 flex flex-col select-none ">
      <div className="px-4 py-2 flex items-center">
        <span className="text-2xl font-semibold line whitespace-nowrap">
          Wähle Playlists aus
        </span>
        <div className="flex-auto" />
        <Badge
          count={outputPlaylists.length}
          style={{ backgroundColor: "rgb(25 64 110 / 1)" }}
        />
      </div>
      <div className="p-2 border-2 border-primary-400 rounded overflow-auto custom-scrollbar flex flex-col gap-1">
        <Input.Group compact className="w-full">
          <Input
            placeholder="neue Playlist"
            style={{ width: "calc(100% - 32px)" }}
            allowClear
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            onPressEnter={handleAddPlaylist}
          />
          <Button icon={<PlusOutlined />} onClick={handleAddPlaylist} />
        </Input.Group>
        {ownedPlaylists.map((p) => (
          <CnfPlaylist key={p.id} {...p} input={false} />
        ))}
      </div>
    </div>
  )
}
export default CnfDestination
