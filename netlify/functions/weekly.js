const { schedule } = require("@netlify/functions")
const { PrismaClient } = require("@prisma/client")
const axios = require("axios")
const { getSpotifyToken } = require("../getSpotifyToken")
const _pullAll = require("lodash/pullAll")
const _uniq = require("lodash/uniq")

const prisma = new PrismaClient()

const spotifyFetcher = axios.create({
  baseURL: "https://api.spotify.com/v1",
  timeout: 3000,
})

const handler = async function (event, context) {
  console.log("Running weekly")
  const weeklyUsers = await prisma.weekly.findMany({
    select: {
      user_id: true,
      input_playlist_id: true,
      output_playlist_id: true,
    },
  })

  console.log("weeklyUsers", weeklyUsers)

  await Promise.all(weeklyUsers.map(handleUser))

  console.log("finished weekly")
  await prisma.$disconnect()
  return {
    statusCode: 200,
  }
}

const handleUser = async (user) => {
  const { user_id, input_playlist_id, output_playlist_id } = user
  const tokenrequest = await getSpotifyToken(user_id)

  if (tokenrequest.statusCode !== 200) {
    console.error("failed to load token")
    return
  }

  const access_token = JSON.parse(tokenrequest.body)

  spotifyFetcher.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${access_token}`
    return config
  })

  return combine(output_playlist_id, input_playlist_id)
}

const combine = async (destinationId, sourceId) => {
  const tracks = _uniq((await Promise.all(sourceId.map(itemUris))).flat())
  const existingTracks = await itemUris(destinationId)
  _pullAll(tracks, existingTracks)

  let chunks = chunk(tracks, 100)
  return Promise.all(chunks.map((tr) => addTracks(destinationId, tr)))
}

const itemUris = async (playlits_id, offset = 0) => {
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

const chunk = (arr, chunkSize = 1) => {
  const tmp = [...arr]
  let cache = []
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

const addTracks = async (playlits_id, uris) => {
  return spotifyFetcher
    .post(`playlists/${playlits_id}/tracks`, { uris })
    .then((response) => response.data)
}

exports.handler = schedule("20 4 * * MON", handler)
