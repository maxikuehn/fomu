import { InfoCircleOutlined } from "@ant-design/icons"
import { Badge, Button, Tooltip } from "antd"
import { useRecoilValue } from "recoil"
import { currentUserPlaylistsState, inputPlaylistState } from "../../recoil"
import CnfPlaylist from "./CnfPlaylist"

const CnfPlaylistList = () => {
  const userPlaylists = useRecoilValue(currentUserPlaylistsState)
  const inputPlaylists = useRecoilValue(inputPlaylistState)

  return (
    <div className="max-h-[85vh] max-w-[400px] flex-1 flex flex-col select-none">
      <div className="px-4 py-2 flex items-center flex-nowrap">
        <span className="text-2xl font-semibold whitespace-nowrap">
          Wähle Playlists aus
        </span>
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
      <div className="p-2 border-2 border-primary-400 rounded overflow-auto custom-scrollbar flex flex-col gap-1">
        {userPlaylists.map((p) => (
          <CnfPlaylist key={p.id} {...p} input={true} />
        ))}
      </div>
    </div>
  )
}
export default CnfPlaylistList
