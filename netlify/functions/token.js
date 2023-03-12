const { PrismaClient } = require("@prisma/client")
const axios = require("axios")
const qs = require("qs")

const { VITE_SP_CLIENT_SECRET: client_secret, VITE_SP_CLIENT_ID: client_id } =
  process.env

const prisma = new PrismaClient()

function getUserProfile(access_token) {
  return axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + access_token,
      ContentType: "application/json",
    },
  })
}

const handler = async function (event) {
  const body = JSON.parse(event.body)
  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "authorization_code",
        code: body.code,
        redirect_uri: body.href,
        client_id,
        code_verifier: body.code_verifier,
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(async (resp) => {
      const sp_user = await getUserProfile(await resp.data.access_token)
      console.log(sp_user.data.display_name)

      var user = await prisma.users.upsert({
        where: { id: sp_user.data.id },
        update: {
          refresh_token: resp.data.refresh_token,
        },
        create: {
          id: sp_user.data.id,
          name: sp_user.data.display_name,
          email: sp_user.data.email,
          refresh_token: resp.data.refresh_token,
        },
      })
      return {
        statusCode: 200,
        body: JSON.stringify({
          access_token: resp.data.access_token,
          name: sp_user.data.display_name,
        }),
      }
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      }
    })
}

module.exports = { handler }
