import _pullAll from "lodash/pullAll"
import _uniq from "lodash/uniq"
import { getRecoil } from "recoil-nexus"
import { useNotification } from "../../Hooks/Notification"
import { currentUserState } from "../../recoil"
import spotifyFetcher from "../spotifyFetcher"

const chunk = (arr: any[], chunkSize = 1) => {
  const tmp = [...arr]
  let cache: any[] = []
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

export const currentUser = async () => {
  return spotifyFetcher
    .get("me/playlists", { params: { limit: 50 } })
    .then((response) => {
      return response.data
    })
}

export const itemUris = async (playlits_id: string, offset = 0) => {
  const limit = 50
  var request = await spotifyFetcher
    .get(`playlists/${playlits_id}/tracks`, { params: { limit, offset } })
    .then((response) => response.data)

  if (request.total === 0) return []
  let tracks = request.items.map((t) => t.track.uri)
  if (offset > 0) return tracks

  let tracksLeft = request.total - (limit + offset)
  let length = Math.ceil(tracksLeft / 50)
  let promises = Array(length)
    .fill(0)
    .map((_, i) => itemUris(playlits_id, (i + 1) * limit))
  return tracks.concat((await Promise.all(promises)).flat())
}

const addTracks = async (playlits_id: string, uris: string[]) => {
  return spotifyFetcher
    .post(`playlists/${playlits_id}/tracks`, { uris })
    .then((response) => response.data)
}

export const addTrack = async (
  playlist_id: string,
  track_id: string,
  checkForExisting = true
) => {
  if (checkForExisting) {
    const existingTracks = await itemUris(playlist_id)
    if (existingTracks.includes(track_id)) return
  }
  const result = await addTracks(playlist_id, [track_id])
  useNotification({
    content: "Track zur Playlist hinzugefügt",
  })
  return result
}

export const combine = async (destinationId: string, sourceId: string[]) => {
  const tracks: string[] = _uniq(
    (await Promise.all(sourceId.map((playlist) => itemUris(playlist)))).flat()
  )

  const existingTracks = await itemUris(destinationId)
  _pullAll(tracks, existingTracks)

  let chunks = chunk(tracks, 100)
  return await Promise.all(chunks.map((tr) => addTracks(destinationId, tr)))
}

export const removeTracks = async (playlist_id: string, tracks: string[]) => {
  return spotifyFetcher
    .delete(`playlists/${playlist_id}/tracks`, {
      data: { tracks: tracks.map((t) => ({ uri: t })) },
    })
    .then((response) => {
      useNotification({
        content: "Track aus Playlist entfernt",
      })
      return response.data
    })
}

export const addCover = async (playlist_id: string, image: string = "/playlist-cover.jpeg") => {
  const blob = await fetch(image).then((response) => response.blob())
  const fileReader = new FileReader()
  fileReader.onloadend = async () => {
    const base64String = fileReader.result
    console.log(base64String)
    return spotifyFetcher
      .put(`playlists/${playlist_id}/images`, base64String,
      )
      .then((response) => response.data)
  }
  fileReader.readAsDataURL(blob)
}

export const create = async (name: string = "F O M U") => {
  const userId = getRecoil(currentUserState)?.id
  return spotifyFetcher
    .post(`users/${userId}/playlists`, {
      name,
      description: "Created by fomu.app :)",
      public: true,
    })
    .then((response) => {
      // addCover(response.data.id)
      return response.data
    })
}
