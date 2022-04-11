import { InfoCircleOutlined } from "@ant-design/icons"
import { Badge, Button, Image, Space, Tooltip, Typography } from "antd"
import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { currentUserPlaylistsState, inputPlaylistState } from "../../recoil"
const { Text } = Typography

const Playlist = ({ name, id, tracks, owner, images }) => {
  const [inputPlaylists, setInputPlaylists] = useRecoilState(inputPlaylistState)
  const [selected, setSelected] = useState(inputPlaylists.includes(id))

  const handleClick = () => {
    if (selected) setInputPlaylists((val) => val.filter((p) => p !== id))
    else setInputPlaylists((val) => [...val, id])
    setSelected(!selected)
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
            <Text keyboard>{owner.display_name}</Text>
          </Space>
        </Space>
      </div>
    </Button>
  )
}

const CnfPlaylistList = () => {
  const userPlaylists = useRecoilValue(currentUserPlaylistsState)
  const inputPlaylists = useRecoilValue(inputPlaylistState)

  return (
    <div className="m-8 max-h-[80vh] min-w-[400px] flex flex-col select-none">
      <div className="px-4 py-2 flex items-center">
        <h1 className=" text-2xl m-0">Wähle Playlists aus</h1>
        <Tooltip
          className="px-3"
          placement="rightBottom"
          title={
            <div>
              Folge Playlists, damit sie hier erscheinen
              <Button type="link" onClick={() => location.reload()}>
                Seite neuladen
              </Button>
            </div>
          }
        >
          <InfoCircleOutlined className="text-lg" />
        </Tooltip>
        <div className="flex-auto" />
        <Badge
          count={inputPlaylists.length}
          style={{ backgroundColor: "rgb(25 64 110 / 1)" }}
        />
      </div>
      <div className="p-2 border-4 border-primary-500 rounded-lg overflow-auto custom-scrollbar flex flex-col gap-1">
        {userPlaylists.map(Playlist)}
      </div>
    </div>
  )
}
export default CnfPlaylistList
