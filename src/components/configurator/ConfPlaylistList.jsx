import { InfoCircleOutlined, InfoOutlined } from "@ant-design/icons"
import { Button, Image, Space, Tooltip, Typography } from "antd"
import { useState } from "react"
const { Text, Title } = Typography

const Playlist = ({ name, id, tracks, owner, images }) => {
  const [selected, setSelected] = useState(false)

  return (
    <Button
      key={id}
      type={selected ? "primary" : "default"}
      style={{ height: "auto" }}
      onClick={() => setSelected(!selected)}
    >
      <div className="flex gap-2 py-1">
        <Image src={images[0].url} width={52} height={52} preview={false} />
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

const PlaylistIn = ({ userPlaylists }) => {
  return (
    <div className="m-8 max-h-[80vh] flex flex-col ">
      <Space>
        <Title level={3} className="px-2">
          Wähle Playlists aus
        </Title>
        <Tooltip title="folge Playlists damit sie hier erscheinen">
          <Button shape="circle" size="small" icon={<InfoOutlined />} />
        </Tooltip>
      </Space>
      <div className="p-2 border-4 border-primary-active rounded-lg overflow-auto custom-scrollbar flex flex-col gap-1">
        {userPlaylists.items.map(Playlist)}
      </div>
    </div>
  )
}
export default PlaylistIn
