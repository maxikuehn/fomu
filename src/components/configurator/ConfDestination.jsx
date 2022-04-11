import { PlusOutlined } from "@ant-design/icons"
import { Badge, Button, Image, Input, Space, Typography } from "antd"
import { useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { createPlaylist, fetchCurrentUserPlaylist } from "../../api/spotify"
import {
  currentUserOwnedPlaylistState,
  currentUserPlaylistsState,
  currentUserState,
  outputPlaylistState,
} from "../../recoil"

const { Text } = Typography

const Playlist = ({ name, id, tracks, images }) => {
  const [outputPlaylists, setOutputPlaylists] =
    useRecoilState(outputPlaylistState)
  const [selected, setSelected] = useState(outputPlaylists.includes(id))

  const handleClick = () => {
    if (selected) {
      setOutputPlaylists((val) => val.filter((p) => p !== id))
      setSelected(false)
    } else {
      setOutputPlaylists((val) => [...val, id])
      setSelected(true)
    }
  }

  return (
    <Button
      key={id}
      type={selected ? "primary" : "default"}
      style={{ height: "auto" }}
      onClick={handleClick}
    >
      <div className="flex gap-2 py-1">
        <Image src={images[0]?.url} width={52} height={52} preview={false} />
        <Space direction="vertical" className="flex-1 text-left">
          <div className="text-ellipsis overflow-hidden max-w-xs">{name}</div>
          <Space>
            <Text keyboard>{tracks.total} Tracks</Text>
          </Space>
        </Space>
      </div>
    </Button>
  )
}

const ConfDestination = () => {
  const ownedPlaylists = useRecoilValue(currentUserOwnedPlaylistState)
  const currentUser = useRecoilValue(currentUserState)
  const outputPlaylists = useRecoilValue(outputPlaylistState)
  const setCurrentUserPlaylists = useSetRecoilState(currentUserPlaylistsState)
  const [newPlaylistName, setNewPlaylistName] = useState("")

  const handleAddPlaylist = async () => {
    return
    await createPlaylist(currentUser.id, newPlaylistName)
    const currentUserPlaylists = await fetchCurrentUserPlaylist()
    console.log("currentUserPlaylists length", currentUserPlaylists.total)
    setCurrentUserPlaylists(currentUserPlaylists.items)
  }

  return (
    <div className="m-8 max-h-[80vh] min-w-[400px] flex flex-col select-none ">
      <div className="px-4 py-2 flex items-center">
        <h1 className=" text-2xl m-0">Wähle Playlists aus</h1>
        <div className="flex-auto" />
        <Badge
          count={outputPlaylists.length}
          style={{ backgroundColor: "rgb(25 64 110 / 1)" }}
        />
      </div>
      <div className="p-2 border-4 border-primary-active rounded-lg overflow-auto custom-scrollbar flex flex-col gap-1">
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
        {ownedPlaylists.map(Playlist)}
      </div>
    </div>
  )
}
export default ConfDestination
