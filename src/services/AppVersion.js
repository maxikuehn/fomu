import { resetStates } from "../recoil"

const CURRENT_VERSION = "1.0.0"

const setVersion = (version) => {
  localStorage.setItem("version", version)
}

export const getVersion = () => {
  return localStorage.getItem("version")
}

/**
 *
 * @returns {boolean} true if the version is up to date
 */
export const checkVersion = () => {
  const version = getVersion()
  if (version === null) {
    setVersion(CURRENT_VERSION)
    return true
  }
  if (version !== CURRENT_VERSION) {
    resetStates()
    setVersion(CURRENT_VERSION)
    console.log("Reset Recoil")
    return false
  }
  return true
}
