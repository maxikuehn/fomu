import { Button, Image, Space } from "antd"
import Text from "antd/lib/typography/Text"
import { useState } from "react"
import { Music } from "react-feather"
import { useRecoilState } from "recoil"
import { inputPlaylistState, outputPlaylistState } from "../../recoil"

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
      onClick={handleClickPlaylist}
    >
      <div className="flex gap-2 py-1 flex-nowrap">
        {images.length > 0 ? (
          <Image
            src={images[0].url}
            width={52}
            height={52}
            preview={false}
            alt="PlaylistCover"
            className="w-[52px] h-[52px] flex-1"
          />
        ) : (
          <div className="w-[52px] h-[52px] border-[1px] border-primary-700 flex items-center justify-center">
            <Music size={45} strokeWidth={1} className="stroke-primary-300" />
          </div>
        )}

        <Space
          direction="vertical"
          className="text-left"
          style={{ maxWidth: "calc(100% - 60px)" }}
        >
          <div className="text-ellipsis overflow-hidden">{name}</div>
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
