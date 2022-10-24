import { atom, selector } from "recoil"
import { sp_playlist } from "../types"
import { currentUserState } from "./currentUserState"
import { inputPlaylistState } from "./inputPlaylistState"
import { joinPlaylistState } from "./joinPlaylistState"
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

export const fullJoinPlaylistState = selector({
  key: "fullJoinPlaylistState",
  get: ({ get }) => {
    const join = get(joinPlaylistState)
    return get(currentUserOwnedPlaylistState).find((p) => p.id === join)
  },
  set: ({ set, get }, _) => {
    set(
      currentUserPlaylistsState,
      [...get(currentUserPlaylistsState)].map((p) => {
        if (p.id === get(joinPlaylistState)) {
          return Object.assign({}, p, {
            tracks: { total: p.tracks.total - 1 },
          })
        } else return p
      })
    )
  },
})
