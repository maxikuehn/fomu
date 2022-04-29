import { PlusOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { createPlaylist } from "../../services/Spotify"
import {
  currentUserOwnedPlaylistState,
  currentUserState,
  outputPlaylistState,
} from "../../recoil"
import CnfPlaylist from "./CnfPlaylist"
import CnfContainer from "./CnfContainer"

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
    <CnfContainer title="Ziel Playlists" badgeCount={outputPlaylists.length}>
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
    </CnfContainer>
  )
}
export default CnfDestination
