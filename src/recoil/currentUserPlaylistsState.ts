import { atom, selector } from "recoil"
import { currentUserState } from "./currentUserState"
import { inputPlaylistState } from "./inputPlaylistState"

export const currentUserPlaylistsState = atom({
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
