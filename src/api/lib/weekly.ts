import { getRecoil } from "recoil-nexus"
import { currentUserState } from "../../recoil"
import netlifyFetcher from "../netlifyFetcher"

interface IRegisterData {
  spotify_user_id: string
  id: string
  input_playlists: string[]
}

export const register = async ({
  inputSelect,
  outputSelect,
}: {
  inputSelect: string[]
  outputSelect: string
}) => {
  const spotify_user = getRecoil(currentUserState)
  if (!spotify_user) return

  const data: IRegisterData = {
    spotify_user_id: spotify_user.id,
    id: outputSelect,
    input_playlists: inputSelect,
  }

  return netlifyFetcher.post("registerWeekly", data).then((response) => {
    return response.data
  })
}
