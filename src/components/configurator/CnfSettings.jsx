import { DoubleRightOutlined } from "@ant-design/icons"
import { Button, Checkbox, Select } from "antd"
import _find from "lodash/find"
import _filter from "lodash/filter"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { combineTracks, createPlaylist } from "../../services/Spotify"
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
import CustomTooltip from "../CustomTooltip"

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
    if (allPlaylists.length === 0) return
    const filterIDs = (input) => {
      return _filter(input, (id) => _find(allPlaylists, { id }))
    }

    setInputPlaylists(filterIDs(inputPlaylists))
    setOutputPlaylists(filterIDs(outputPlaylists))
  }, [])

  useEffect(() => {
    if (joinPlaylist === "new") return
    if (!inputPlaylists.includes(joinPlaylist)) setJoinPlaylist(null)
  }, [inputPlaylists])

  const handleClickGooo = async () => {
    setLoading(true)
    let newPlaylistID = joinPlaylist

    if (joinPlaylist === "new") {
      const newPlaylist = await createPlaylist(currentUser.id)
      newPlaylistID = newPlaylist.id
      setJoinPlaylist(newPlaylistID)
      setContext(newPlaylist.uri)
      if (!newPlaylistID) return
    } else {
      setContext(_find(allPlaylists, { id: joinPlaylist }).uri)
    }

    const tracks = allPlaylists
      .filter((p) => inputPlaylists.includes(p.id) && p.id !== newPlaylistID)
      .map((p) => p.id)

    await combineTracks(newPlaylistID, tracks)
    setInputPlaylists([newPlaylistID])
    setApp(EAppState.Player)
    setLoading(false)
  }

  return (
    <div className="p-2 w-80 h-min self-center border-2 border-primary-500 rounded flex flex-col gap-2">
      <div>
        <span>Joined Playlist:</span>
        <CustomTooltip
          content={
            "Alle Tracks aus den Quell-Playlists werden in der Joined Playlist zusammengefasst."
          }
        />
      </div>
      <Select
        className="w-full"
        defaultValue={null}
        value={joinPlaylist}
        onChange={(v) => setJoinPlaylist(v)}
      >
        <Select.Option key={"new"} value={"new"}>
          Neue Playlist verwenden
        </Select.Option>
        {ownedSelectdPlaylists.map((p) => (
          <Select.Option key={p.id} value={p.id}>
            {p.name}
          </Select.Option>
        ))}
      </Select>
      <div>
        <Checkbox
          checked={deleteTracks}
          onChange={(e) => setDeleteTracks(e.target.checked)}
        >
          Tracks löschen
        </Checkbox>
        <CustomTooltip
          content={
            "Soll ein Track aus der Joined Playlist gelöscht werden, nachdem er sortiert wurde?"
          }
        />
      </div>
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
