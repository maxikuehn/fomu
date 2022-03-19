import { atom } from "recoil"

const SPOT_AUTH = "spotify-authentication"

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue, oldValue, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue))
    })
  }

const spotifyAuthState = atom({
  key: "spotifyAuthState",
  default: null,
  effects: [localStorageEffect(SPOT_AUTH)],
})

export default spotifyAuthState
