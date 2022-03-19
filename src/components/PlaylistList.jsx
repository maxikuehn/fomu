import { useRecoilState, useRecoilValue } from "recoil"
import spotifyAuthState from "../recoil/spotifyAuthState"
import { currentUserPlaylistsState } from "../recoil/currentUserPlaylistsState"
import { useState } from "react"
import classNames from "classnames"
import { Transition } from "@tailwindui/react"

const PlaylistItem = (playlist) => {
  const { id, name, images } = playlist
  return <div key={id}>{name}</div>
}

const PlaylistList = ({ open }) => {
  const spotifyAuth = useRecoilValue(spotifyAuthState)
  const [currentUserPlaylists, setCurrentUserPlaylists] = useRecoilState(
    currentUserPlaylistsState
  )
  // const [open, setOpen] = useState(true)
  if (!currentUserPlaylists || currentUserPlaylists.length === 0) return <div />

  console.log("currentUserPlaylists", currentUserPlaylists.items[1])

  return (
    <Transition
      show={open}
      enter="transition-width duration-300"
      enterFrom="w-auto"
      enterTo="w-0"
      leave="transition-width duration-300"
      leaveFrom="w-auto"
      leaveTo="w-0"
    >
      {currentUserPlaylists.items.map(PlaylistItem)}
    </Transition>
    // {/* <OpenButton toggleOpen={() => setOpen(!open)} /> */}
  )
}
export default PlaylistList

const OpenButton = ({ toggleOpen }) => {
  return (
    <button className="absolute top-1/2 right-0" onClick={toggleOpen}>
      open
    </button>
  )
}
