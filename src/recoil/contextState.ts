import { atom, selector } from "recoil"
import localStorageEffect from "./localSorageEffect"

export const contextState = atom<string>({
  key: "contextState",
  default: "",
  effects: [localStorageEffect("contextState")],
})

export const contextIdState = selector({
  key: "contextIdState",
  get: ({ get }) => {
    let state = get(contextState).split(":")
    return state[state.length - 1]
  },
})
