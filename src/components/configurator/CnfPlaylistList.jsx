import { Button } from "antd"
import { useRecoilValue } from "recoil"
import { currentUserPlaylistsState, inputPlaylistState } from "../../recoil"
import CnfContainer from "./CnfContainer"
import CnfPlaylist from "./CnfPlaylist"

const CnfPlaylistList = () => {
  const userPlaylists = useRecoilValue(currentUserPlaylistsState)
  const inputPlaylists = useRecoilValue(inputPlaylistState)

  return (
    <CnfContainer
      title="Quelle Playlists"
      badgeCount={inputPlaylists.length}
      tooltip={
        <div>
          Folge Playlists, damit sie hier erscheinen
          <Button type="link" onClick={() => location.reload()}>
            Seite neuladen
          </Button>
        </div>
      }
    >
      {userPlaylists.map((p) => (
        <CnfPlaylist key={p.id} {...p} input={true} />
      ))}
    </CnfContainer>
  )
}
export default CnfPlaylistList
