import firebaseFetcher from "../firebaseFetcher.js"
import { getRecoil, setRecoil } from "recoil-nexus"
import { currentUserState, spotifyAuthState } from "../../recoil"

interface IOutputPlaylist {
  id: string
  input_playlist: string[]
}

interface IRegisterData {
  refresh_token: string
  spotify_user_id: string
  spotify_user_name: string
  output_playlist: IOutputPlaylist[]
}

export const register = async ({
  inputSelect,
  outputSelect,
}: {
  inputSelect: string[]
  outputSelect: string
}) => {
  const refresh_token = getRecoil(spotifyAuthState)?.refresh_token
  const spotify_user = getRecoil(currentUserState)
  if (!refresh_token || !spotify_user) return

  const data: IRegisterData = {
    refresh_token,
    spotify_user_id: spotify_user.id,
    spotify_user_name: spotify_user.display_name,
    output_playlist: [
      {
        id: outputSelect,
        input_playlist: inputSelect,
      },
    ],
  }

  return firebaseFetcher.post("addUser", data).then((response) => {
    return response.data
  })
}
