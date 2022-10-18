const axios = require("axios")
const qs = require("qs")

const { VITE_SP_CLIENT_SECRET: client_secret, VITE_SP_CLIENT_ID: client_id } =
  process.env

const handler = async function (event) {
  const body = JSON.parse(event.body)
  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "refresh_token",
        refresh_token: body.refresh_token,
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
    .then((resp) => {
      return {
        statusCode: 200,
        body: JSON.stringify(resp.data),
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
