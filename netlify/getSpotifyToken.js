const { PrismaClient } = require("@prisma/client")
const axios = require("axios")
const qs = require("qs")

const { VITE_SP_CLIENT_SECRET: client_secret, VITE_SP_CLIENT_ID: client_id } =
  process.env

const prisma = new PrismaClient()

const getSpotifyToken = async function (user_id) {
  const refresh_token = await prisma.users
    .findUnique({
      where: { id: user_id },
    })
    .then((user) => user.refresh_token)
  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "refresh_token",
        refresh_token,
        client_id,
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${client_id}:${client_secret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(async (resp) => {
      await prisma.users.update({
        where: { id: user_id },
        data: {
          refresh_token: resp.data.refresh_token,
        },
      })
      return {
        statusCode: 200,
        body: JSON.stringify(resp.data.access_token),
      }
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      }
    })
}

module.exports = { getSpotifyToken }
