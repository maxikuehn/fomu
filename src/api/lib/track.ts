import _chunk from "lodash/chunk"
import _pullAll from "lodash/pullAll"
import _uniq from "lodash/uniq"
import { useNotification } from "../../Hooks/Notification"
import spotifyFetcher from "../spotifyFetcher"

export const userSaved = async () => {
  let likedTracks: string[] = []
  let offset = 0
  let limit = 50
  while (true) {
    const response = await spotifyFetcher.get("me/tracks", {
      params: { limit, offset },
    })
    likedTracks = likedTracks.concat(
      response.data.items.map((t: any) => t.track.id)
    )
    if (offset + limit >= response.data.total) break
    offset += limit
  }
  return likedTracks
}

export const isSaved = async (trackId: string) => {
  return spotifyFetcher
    .get("me/tracks/contains", { params: { ids: trackId } })
    .then((response) => response.data[0])
}

export const saveTrack = async (trackId: string) => {
  return spotifyFetcher.put(`me/tracks?ids=${trackId}`).then((response) => {
    useNotification({
      content: "Zu deinen Lieblingssongs hinzugefügt",
    })
    return response.data
  })
}

export const removeTrack = async (trackId: string) => {
  return spotifyFetcher.delete(`me/tracks?ids=${trackId}`).then((response) => {
    useNotification({
      content: "Aus deinen Lieblingssongs entfernt",
    })
    return response.data
  })
}
