const axios = require("axios")
const qs = require("qs")

const client_id = "9076f429c5f3490fa8c08428f47cbd60" // Your client id
const client_secret = "c3363dd311ba4421b79c41d205b1b4f5" // Your secret

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
