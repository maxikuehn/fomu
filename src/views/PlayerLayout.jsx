import { Suspense, useEffect, useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import { fetchCurrentUserPlaylist } from "../api/spotify"
import TopBar from "../components/TopBar"
import PlaylistList from "../components/PlaylistList"
import { currentUserPlaylistsState } from "../recoil/currentUserPlaylistsState"

const PlayerLayout = (props) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="w-full h-full flex flex-row">
      <div id="sidebar" className="bg-red-600 ">
        <PlaylistList open={open} />
        <button
          className="absolute top-1/2 right-0"
          onClick={() => setOpen(!open)}
        >
          open
        </button>
      </div>

      <div id="right" className="bg-yellow-400 flex-auto flex flex-col">
        <div id="player" className="flex-auto flex">
          <div className="bg-gray-600 flex-auto">player</div>
          <div className="bg-blue-600 basis-80">playlistAdd</div>
        </div>
      </div>
    </div>
  )
}
export default PlayerLayout
