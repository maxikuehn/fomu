import { currentUserPlaylistsState } from "../recoil/currentUserPlaylistsState"
import { useRecoilValue } from "recoil"
import ConfPlaylistList from "../components/configurator/ConfPlaylistList"
import ConfSettings from "../components/configurator/ConfSettings"
import ConfDestination from "../components/configurator/ConfDestination"
import currentUserProfileState from "../recoil/currentUserState"

const ConfiguratorLayout = ({ finishConfig }) => {
  const userPlaylists = useRecoilValue(currentUserPlaylistsState)
  const currentUserProfile = useRecoilValue(currentUserProfileState)
  console.log("currentUserProfile", currentUserProfile)

  if (!userPlaylists || userPlaylists.length === 0) return <div />
  console.log("userPlaylists", userPlaylists.items[1])

  return (
    <div className="flex flex-grow justify-evenly border-0 border-yellow-300 ">
      <ConfPlaylistList userPlaylists={userPlaylists} />
      <ConfSettings
        ownedPlaylists={userPlaylists.items.filter(
          (p) => p.owner.id === currentUserProfile.id
        )}
      />
      <ConfDestination />
    </div>
  )
}
export default ConfiguratorLayout
