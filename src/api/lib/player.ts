import { setRecoil } from "recoil-nexus"
import { useNotification } from "../../Hooks/Notification"
import { triggerPlayerUpdateState } from "../../recoil"
import spotifyFetcher from "../spotifyFetcher"

const base = "me/player"

const forcePlayerUpdate = () => {
  setRecoil(triggerPlayerUpdateState, true)
}

export const playbackState = async () => {
  return spotifyFetcher.get(`${base}`).then((response) => {
    return response.data
  })
}

export const transferPlayback = async (device_ids: string[]) => {
  return spotifyFetcher.put(`${base}`, { device_ids }).then((response) => {
    forcePlayerUpdate()
    return response.data
  })
}

export const availableDevices = async () => {
  return spotifyFetcher.get(`${base}/devices`).then((response) => {
    return response.data
  })
}

export const startPlayback = async ({
  device_id,
  context_uri,
  position,
}: {
  context_uri: string
  device_id: string
  position: number
}) => {
  return spotifyFetcher
    .put(
      `${base}/play`,
      { context_uri, offset: { position } },
      { params: { device_id } }
    )
    .then((response) => {
      forcePlayerUpdate()
      return response.data
    })
}

export const pausePlayback = async () => {
  return spotifyFetcher.put(`${base}/pause`).then((response) => {
    forcePlayerUpdate()
    return response.data
  })
}

export const nextTrack = async () => {
  return spotifyFetcher.post(`${base}/next`).then((response) => {
    forcePlayerUpdate()
    return response.data
  })
}

export const previousTrack = async () => {
  return spotifyFetcher.post(`${base}/previous`).then((response) => {
    forcePlayerUpdate()
    return response.data
  })
}

export const seekPosition = async (position_ms: number) => {
  return spotifyFetcher
    .put(`${base}/seek`, {}, { params: { position_ms } })
    .then((response) => {
      forcePlayerUpdate()
      return response.data
    })
}

export const setRepeat = async (state: "track" | "context" | "off") => {
  return spotifyFetcher
    .put(`${base}/repeat`, {}, { params: { state } })
    .then((response) => {
      forcePlayerUpdate()
      return response.data
    })
}

export const setPlaybackVolume = async (volume_percent: number) => {
  return spotifyFetcher
    .put(`${base}/volume`, {}, { params: { volume_percent } })
    .then((response) => {
      return response.data
    })
}

export const setShuffle = async (state: boolean) => {
  return spotifyFetcher
    .put(`${base}/shuffle`, {}, { params: { state } })
    .then((response) => {
      forcePlayerUpdate()
      return response.data
    })
}

export const addToQueue = async (uri: string, notify = false) => {
  return spotifyFetcher
    .post(`${base}/queue`, {}, { params: { uri } })
    .then((response) => {
      if (notify)
        useNotification({
          content: "Track zur Warteschlange hinzugefügt",
        })
      return response.data
    })
}
