import { DoubleRightOutlined } from "@ant-design/icons"
import { Button, Checkbox, Select } from "antd"
import Text from "antd/lib/typography/Text"
import _find from "lodash/find"
import _filter from "lodash/filter"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { combineTracks, createPlaylist } from "../../api/spotify"
import {
  appState,
  contextState,
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
  const [inputPlaylists, setInputPlaylists] = useRecoilState(inputPlaylistState)
  const [outputPlaylists, setOutputPlaylists] =
    useRecoilState(outputPlaylistState)
  const allPlaylists = useRecoilValue(currentUserPlaylistsState)
  const currentUser = useRecoilValue(currentUserState)
  const setApp = useSetRecoilState(appState)
  const setContext = useSetRecoilState(contextState)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // TODO: setzt arrays zurück beim Neuladen der Seite
    const filterIDs = (input) => {
      console.log("input", input)
      return _filter(input, (id) => _find(allPlaylists, { id }))
    }
    setInputPlaylists(filterIDs)
    setOutputPlaylists(filterIDs)
  }, [])

  useEffect(() => {
    if (joinPlaylist === "new") return
    if (!inputPlaylists.includes(joinPlaylist)) setJoinPlaylist(null)
  }, [inputPlaylists])

  const handleClickGooo = async () => {
    setLoading(true)
    let newPlaylistID = joinPlaylist

    if (joinPlaylist === "new") {
      const newPlaylist = await createPlaylist(currentUser.id, "SPOTINDERFY")
      newPlaylistID = newPlaylist.id
      setJoinPlaylist(newPlaylistID)
      setContext(newPlaylist.uri)
      setInputPlaylists([newPlaylistID])
      if (!newPlaylistID) return
    } else {
      setContext(_find(allPlaylists, { id: joinPlaylist }).uri)
    }

    const tracks = allPlaylists
      .filter((p) => inputPlaylists.includes(p.id) && p.id !== newPlaylistID)
      .map((p) => p.id)

    await combineTracks(newPlaylistID, tracks)
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
          outputPlaylists.length === 0
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
