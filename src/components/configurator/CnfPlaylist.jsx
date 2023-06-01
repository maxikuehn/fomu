import { Button, Image, Space, Typography } from "antd"
import { useState } from "react"
import { Music } from "react-feather"
import { useRecoilState } from "recoil"
import { inputPlaylistState, outputPlaylistState } from "../../recoil"

const { Text } = Typography

const CnfPlaylist = ({ name, id, tracks, images, owner, input }) => {
  const [playlists, setPlaylists] = useRecoilState(
    input ? inputPlaylistState : outputPlaylistState
  )
  const [selected, setSelected] = useState(playlists.includes(id))

  const handleClickPlaylist = () => {
    if (selected) setPlaylists((val) => val.filter((p) => p !== id))
    else setPlaylists((val) => [...val, id])
    setSelected(!selected)
  }

  return (
    <Button
      type={selected ? "primary" : "default"}
      style={{ height: "auto" }}
      className={selected ? "bg-primary-0" : "bg-transparent"}
      onClick={handleClickPlaylist}
    >
      <div className="flex flex-nowrap gap-2 py-1">
        {images.length > 0 ? (
          <Image
            src={images[images.length - 1].url}
            width={52}
            height={52}
            preview={false}
            alt="PlaylistCover"
            className="h-[52px] w-[52px] flex-1"
          />
        ) : (
          <div className="flex h-[52px] w-[52px] items-center justify-center bg-primary-600">
            <Music size={45} strokeWidth={1} className="stroke-primary-0" />
          </div>
        )}

        <Space
          direction="vertical"
          className="text-left"
          style={{ maxWidth: "calc(100% - 60px)" }}
        >
          <div className="overflow-hidden text-ellipsis">{name}</div>
          <Space>
            <Text keyboard>
              {tracks.total} {`Track${tracks.total !== 1 ? "s" : ""}`}
            </Text>
            {input && <Text keyboard>{owner.display_name}</Text>}
          </Space>
        </Space>
      </div>
    </Button>
  )
}

export default CnfPlaylist
