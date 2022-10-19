import { atom, selector } from "recoil"
import { sp_playlist } from "../types"
import { currentUserState } from "./currentUserState"
import { inputPlaylistState } from "./inputPlaylistState"
import { outputPlaylistState } from "./outputPlaylistState"

export const currentUserPlaylistsState = atom<sp_playlist[]>({
  key: "currentUserPlaylistsState",
  default: [],
})

export const currentUserOwnedPlaylistState = selector({
  key: "currentUserOwnedPlaylistState",
  get: ({ get }) => {
    const currentUserID = get(currentUserState)
    if (!currentUserID) return []
    return get(currentUserPlaylistsState).filter(
      (p) => p.owner.id === currentUserID.id
    )
  },
})

export const currentUserOwnedSelectedPlaylistState = selector({
  key: "currentUserOwnedSelectedPlaylistState",
  get: ({ get }) => {
    const selected = get(inputPlaylistState)
    return get(currentUserOwnedPlaylistState).filter((p) =>
      selected.includes(p.id)
    )
  },
})

export const fullOutputPlaylistState = selector({
  key: "fullOutputPlaylistState",
  get: ({ get }) => {
    const selected = get(outputPlaylistState)
    return get(currentUserOwnedPlaylistState).filter((p) =>
      selected.includes(p.id)
    )
  },
})
