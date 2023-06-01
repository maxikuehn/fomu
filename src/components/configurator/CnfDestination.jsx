import { PlusOutlined } from "@ant-design/icons"
import { Button, Input, Space } from "antd"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import {
  currentUserOwnedPlaylistState,
  outputPlaylistState,
} from "../../recoil"
import CnfPlaylist from "./CnfPlaylist"
import CnfContainer from "./CnfContainer"
import api from "../../api"

const CnfDestination = () => {
  const ownedPlaylists = useRecoilValue(currentUserOwnedPlaylistState)
  const outputPlaylists = useRecoilValue(outputPlaylistState)
  const [newPlaylistName, setNewPlaylistName] = useState("")

  const handleAddPlaylist = async () => {
    if (!newPlaylistName || newPlaylistName === "") return
    await api.playlist.create(newPlaylistName)
    location.reload()
  }

  return (
    <CnfContainer title="Ziel Playlists" badgeCount={outputPlaylists.length}>
      <Space.Compact className="w-full">
        <Input
          placeholder="neue Playlist"
          style={{ width: "calc(100% - 32px)" }}
          allowClear
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          onPressEnter={handleAddPlaylist}
        />
        <Button icon={<PlusOutlined />} onClick={handleAddPlaylist} />
      </Space.Compact>
      {ownedPlaylists.map((p) => (
        <CnfPlaylist key={p.id} {...p} input={false} />
      ))}
    </CnfContainer>
  )
}
export default CnfDestination
