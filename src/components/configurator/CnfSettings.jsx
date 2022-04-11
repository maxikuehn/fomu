import { DoubleRightOutlined } from "@ant-design/icons"
import { Button, Checkbox, Select } from "antd"
import Text from "antd/lib/typography/Text"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { combineTracks, createPlaylist } from "../../api/spotify"
import {
  appState,
  currentUserOwnedSelectedPlaylistState,
  currentUserPlaylistsState,
  currentUserState,
  deleteTracksState,
  inputPlaylistState,
  joinPlaylistState,
  outputPlaylistState,
} from "../../recoil"
import { EAppState } from "../../types"

const CnfSettings = () => {
  const ownedSelectdPlaylists = useRecoilValue(
    currentUserOwnedSelectedPlaylistState
  )
  const [deleteTracks, setDeleteTracks] = useRecoilState(deleteTracksState)
  const [joinPlaylist, setJoinPlaylist] = useRecoilState(joinPlaylistState)
  const inputPlaylists = useRecoilValue(inputPlaylistState)
  const outputPlaylist = useRecoilValue(outputPlaylistState)
  const allPlaylists = useRecoilValue(currentUserPlaylistsState)
  const currentUser = useRecoilValue(currentUserState)
  const setApp = useSetRecoilState(appState)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (joinPlaylist === "new") return
    if (!inputPlaylists.includes(joinPlaylist)) setJoinPlaylist(null)
  }, [inputPlaylists])

  const handleClickGooo = async () => {
    setLoading(true)
    let newPlaylist = joinPlaylist
    if (joinPlaylist === "new") {
      newPlaylist = (await createPlaylist(currentUser.id, "NEUEEE")).id
      setJoinPlaylist(newPlaylist)
      if (!newPlaylist) return
    }
    const tracks = allPlaylists
      .filter((p) => inputPlaylists.includes(p.id) && p.id !== newPlaylist)
      .map((p) => p.id)

    await combineTracks(newPlaylist, tracks).then((d) => console.log("d", d))
    setApp(EAppState.Player)
    setLoading(false)
  }

  return (
    <div className="p-2 m-8 w-80 h-min self-center border-4 border-primary-500 rounded-lg flex flex-col gap-2">
      <Text>Zusammenführen in:</Text>

      <Select
        className="w-full"
        defaultValue={null}
        value={joinPlaylist}
        onChange={(v) => setJoinPlaylist(v)}
      >
        <Select.Option key={"new"} value={"new"}>
          Playlist automatisch erstellen
        </Select.Option>
        {ownedSelectdPlaylists.map((p) => (
          <Select.Option key={p.id} value={p.id}>
            {p.name}
          </Select.Option>
        ))}
      </Select>
      <Checkbox
        checked={deleteTracks}
        onChange={(e) => setDeleteTracks(e.target.checked)}
      >
        Tracks löschen
      </Checkbox>
      <Button
        type="primary"
        disabled={
          joinPlaylist === null ||
          inputPlaylists.length === 0 ||
          outputPlaylist.length === 0
        }
        icon={<DoubleRightOutlined />}
        loading={loading}
        onClick={handleClickGooo}
      >
        Lets gooo
      </Button>
    </div>
  )
}
export default CnfSettings
