const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const handler = async function (event) {
  const { spotify_user_id, id, input_playlists } = JSON.parse(event.body)
  const result = await prisma.weekly.upsert({
    where: {
      user_id_output_playlist_id: {
        user_id: spotify_user_id,
        output_playlist_id: id,
      },
    },
    update: {
      input_playlist_id: input_playlists,
    },
    create: {
      user_id: spotify_user_id,
      output_playlist_id: id,
      input_playlist_id: input_playlists,
    },
  })
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}

module.exports = { handler }
