import { atom } from "recoil"

interface IPlayerState {
  device: any
  repeat_state: string
  shuffle_state: string
  context: any
  timestamp: number
  progress_ms: number
  is_playing: boolean
  item: any
  currently_playing_type: string
  actions: any
}

export const playerState = atom<IPlayerState | undefined>({
  key: "playerState",
  default: undefined,
})
