import axios from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import _delay from "lodash/delay"
import _pullAll from "lodash/pullAll"
import _chunk from "lodash/chunk"
import qs from "qs"
import { getRecoil, setRecoil } from "recoil-nexus"
import { spotifyAuthState } from "../recoil"
import scopes from "./Scopes"
import { useNotification } from "../Hooks/Notification"

const BASE_URL = "https://api.spotify.com/v1"
const REDIRECT_URI = import.meta.env.VITE_SP_REDIRECT_URI
const CLIENT_ID = import.meta.env.VITE_SP_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SP_CLIENT_SECRET

const authHeader = () => {
  const spotifyAuth = getRecoil(spotifyAuthState)
  return {
    Authorization: `Bearer ${spotifyAuth.access_token}`,
  }
}

const spotifyFetcher = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
})

spotifyFetcher.interceptors.response.use(null, (error) => {
  if (error.config && error.response && error.response.status >= 500) {
    // console.log("error.config", error.config)
    return spotifyFetcher.request({
      method: error.config.method,
      url: error.config.url,
      headers: authHeader(),
      params: error.config.params,
      data: error.config.data,
    })
  }
  if (error.config && error.response && error.response.status === 429) {
    _delay(() => {
      // console.log(
      //   "error.response.headers['retry-after']",
      //   error.response.headers,
      //   error.response.headers["retry-after"] * 1000
      // )
      return spotifyFetcher.request({
        method: error.config.method,
        url: error.config.url,
        headers: authHeader(),
        params: error.config.params,
        data: error.config.data,
      })
    }, error.response.headers["retry-after"] * 1000 ?? 3000)
  }
  return Promise.reject(error)
})

export const requestRefreshedAccessToken = async (failedRequest) => {
  console.log("refreshing token..")
  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "refresh_token",
        refresh_token: getRecoil(spotifyAuthState).refresh_token,
      }),
      {
        headers: {
          Authorization:
            "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((resp) => {
      setRecoil(
        spotifyAuthState,
        Object.assign({}, getRecoil(spotifyAuthState), resp.data)
      )
      if (failedRequest) {
        failedRequest.response.config.headers[
          "Authorization"
        ] = `Bearer ${resp.data.access_token}`
        // console.log("failedRequest", failedRequest.response)
      }
      return Promise.resolve()
    })
    .catch((error) => {
      console.log("error", error.message)
      return error
    })
}

createAuthRefreshInterceptor(axios, requestRefreshedAccessToken)
createAuthRefreshInterceptor(spotifyFetcher, requestRefreshedAccessToken, {
  statusCodes: [401],
  // pauseInstanceWhileRefreshing: true,
})

export const fetchCurrentUserPlaylist = async () => {
  return spotifyFetcher
    .get("me/playlists", {
      params: { limit: 50 },
      headers: authHeader(),
    })
    .then((response) => {
      // console.log("response", response)
      return response.data
    })
    .catch((error) => console.log("error", error))
}

export const fetchPlaylistItemUris = async (playlits_id, offset = 0) => {
  const limit = 50
  var request = await spotifyFetcher
    .get(`playlists/${playlits_id}/tracks`, {
      params: { limit, offset },
      headers: authHeader(),
    })
    .then((response) => response.data)
    .catch((error) => {
      // console.log("error", error)
      return
    })
  if (request.total === 0) return []
  let tracks = request.items.map((t) => t.track.uri)
  if (offset > 0) return tracks

  let tracksLeft = request.total - (limit + offset)
  let length = Math.ceil(tracksLeft / 50)
  // console.log("total:", request.total, "done:", offset, "length:", length)
  let promises = Array(length)
    .fill(0)
    .map((_, i) => fetchPlaylistItemUris(playlits_id, (i + 1) * limit))
  let tracks2 = (await Promise.all(promises)).flat()
  return tracks.concat(tracks2)
}

export const postItemsInPlaylist = async (playlits_id, uris) => {
  return spotifyFetcher
    .post(
      `playlists/${playlits_id}/tracks`,
      { uris },
      {
        headers: authHeader(),
      }
    )
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

/**
 * Adds Track to Playlist if not allready in Playlist
 * @param {string} playlist_id
 * @param {string} track_id
 */
export const addTrackToPlaylist = async (
  playlist_id,
  track_id,
  checkForExisting = true
) => {
  if (checkForExisting) {
    const existingTracks = await fetchPlaylistItemUris(playlist_id)
    if (existingTracks.includes(track_id)) return
  }
  const result = await postItemsInPlaylist(playlist_id, [track_id])
  useNotification({
    content: "Track zur Playlist hinzugefügt",
  })
  return result
}

export const combineTracks = async (destinationId, sourceId) => {
  console.log("combine")

  const tracks = (
    await Promise.all(
      sourceId.map((playlist) => fetchPlaylistItemUris(playlist))
    )
  ).flat()

  const existingTracks = await fetchPlaylistItemUris(destinationId)
  _pullAll(tracks, existingTracks)
  console.log("new tracks in destPlaylist:", tracks.length)

  let chunks = _chunk(tracks, 100)
  return await Promise.all(
    chunks.map((tr) => postItemsInPlaylist(destinationId, tr))
  )
}

/**
 * Removes Track from Playlist
 * @param {string} playlist_id
 * @param {string[]} tracks
 */
export const removeTracksFromPlaylist = async (playlist_id, tracks) => {
  return spotifyFetcher
    .delete(`playlists/${playlist_id}/tracks`, {
      data: { tracks: tracks.map((t) => ({ uri: t })) },
      headers: authHeader(),
    })
    .then((response) => {
      useNotification({
        content: "Track aus Playlist entfernt",
      })
      return response.data
    })
    .catch((error) => console.log("error", error))
}

export const fetchUserSaveTrackIds = async () => {
  let likedTracks = []
  let offset = 0
  let limit = 50
  let total = 0
  while (true) {
    const response = await spotifyFetcher.get("me/tracks", {
      params: { limit, offset },
      headers: authHeader(),
    })
    total = response.data.total
    likedTracks = likedTracks.concat(response.data.items.map((t) => t.track.id))
    if (offset + limit >= total) break
    offset += limit
  }
  return likedTracks
}

export const checkUserSaveTrackId = async (trackIds) => {
  return spotifyFetcher
    .get("me/tracks/contains", {
      headers: authHeader(),
      params: { ids: trackIds },
    })
    .then((response) => response.data[0])
    .catch((error) => console.log("error", error))
}

export const saveTrackCurrentUser = async (trackIds) => {
  return spotifyFetcher
    .put(
      "me/tracks",
      { ids: [trackIds] },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      useNotification({
        content: "Zu deinen Lieblingssongs hinzugefügt",
      })
      return response.data
    })
    .catch((error) => console.log("error", error))
}

export const removeTrackCurrentUser = async (trackIds) => {
  return spotifyFetcher
    .delete("me/tracks", {
      headers: authHeader(),
      data: { ids: [trackIds] },
    })
    .then((response) => {
      useNotification({
        content: "Aus deinen Lieblingssongs entfernt",
      })

      return response.data
    })
    .catch((error) => console.log("error", error))
}

export const fetchCurrentUserProfile = async () => {
  return spotifyFetcher
    .get("me", {
      headers: authHeader(),
    })
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

export const createPlaylist = async (userId, name = "SPOTINDERFY") => {
  return spotifyFetcher
    .post(
      `users/${userId}/playlists`,
      { name, description: "Created by spotinderfy.ai :)", public: false },
      { headers: authHeader() }
    )
    .then((response) => response.data)
    .catch((error) => {
      return { error }
    })
}

export const fetchPlayer = async () => {
  return spotifyFetcher
    .get("me/player", { headers: authHeader() })
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

export const playerSkipToNext = async () => {
  return spotifyFetcher
    .post("me/player/next", {}, { headers: authHeader() })
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

export const playerSkipToPrevious = async () => {
  return spotifyFetcher
    .post("me/player/previous", {}, { headers: authHeader() })
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

export const playerPause = async () => {
  return spotifyFetcher
    .put("me/player/pause", {}, { headers: authHeader() })
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

export const playerPlay = async (context_uri = null, device_id = null) => {
  return spotifyFetcher
    .put(
      "me/player/play",
      {
        context_uri,
      },
      {
        headers: authHeader(),
        params: { device_id },
      }
    )
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

export const playerPlayTrack = async (trackId, device_id = null) => {
  return spotifyFetcher
    .put(
      "me/player/play",
      {
        // context_uri,
        uris: [trackId],
      },
      {
        headers: authHeader(),
        params: { device_id },
      }
    )
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

export const playerAddToQueue = async (uri, notify = false) => {
  return spotifyFetcher
    .post(
      "me/player/queue",
      {},
      {
        headers: authHeader(),
        params: { uri },
      }
    )
    .then((response) => {
      if (notify)
        useNotification({
          content: "Track zur Warteschlange hinzugefügt",
        })
      return response.data
    })
    .catch((error) => console.log("error", error))
}

/**
 *
 * @param {number} position_ms - duration in seconds
 */
export const playerSeek = async (position_ms) => {
  return spotifyFetcher
    .put(
      "me/player/seek",
      {},
      { headers: authHeader(), params: { position_ms } }
    )
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

/**
 * Spotify Web API - Set Volume
 * @param {number} volume_percent - The volume to set. Must be a value from 0 to 100 inclusive.
 *
 */
export const playerSetVolume = async (volume_percent) => {
  return spotifyFetcher
    .put(
      "me/player/volume",
      {},
      { headers: authHeader(), params: { volume_percent } }
    )
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

/**
 * Spotify Web API - Set Shuffle Mode
 * @param {Boolean} state - true or false
 * @return {Object} - the new shuffle mode
 */
export const playerSetShuffle = async (state) => {
  return spotifyFetcher
    .put("me/player/shuffle", {}, { headers: authHeader(), params: { state } })
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

/**
 *  Spotify Web API - Set Repeat Mode
 *  @param {string} state - one of 'track', 'context', 'off'
 */
export const playerSetRepeat = async (state) => {
  return spotifyFetcher
    .put("me/player/repeat", {}, { headers: authHeader(), params: { state } })
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

export const fetchAvailableDevices = async () => {
  return spotifyFetcher
    .get("me/player/devices", { headers: authHeader() })
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

export const transferPlayback = async (device) => {
  return spotifyFetcher
    .put("me/player", { device_ids: [device] }, { headers: authHeader() })
    .then((response) => response.data)
    .catch((error) => console.log("error", error))
}

export const requestUserAuthorization = async () => {
  var generateRandomString = function (length) {
    var text = ""
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  const _url = new URL("https://accounts.spotify.com/authorize")
  _url.searchParams.append("client_id", CLIENT_ID)
  _url.searchParams.append("response_type", "code")
  _url.searchParams.append("redirect_uri", REDIRECT_URI)
  _url.searchParams.append("state", generateRandomString(16))
  _url.searchParams.append("scope", scopes.join(" "))
  _url.searchParams.append("show_dialog", false)

  window.location = _url
}

export const requestAccessToken = async (code) => {
  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          Authorization:
            "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((resp) => {
      setRecoil(spotifyAuthState, resp.data)
      return
    })
    .catch((error) => {
      console.log("error", error.message)
      return error
    })
}
