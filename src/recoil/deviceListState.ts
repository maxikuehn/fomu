import { atom } from "recoil"

interface IDevice {
  id: string
  is_active: boolean
  is_private_session: boolean
  is_restricted: boolean
  name: string
  type: string
  volume_percent: number
}

export const deviceListState = atom<IDevice[]>({
  key: "deviceListState",
  default: [],
})
