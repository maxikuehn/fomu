const { decrypt } = require("../decryption")
const { getSpotifyToken } = require("../getSpotifyToken")

const handler = async function (event) {
  const cipher = event.body
  if (!cipher) {
    return {
      statusCode: 400,
      body: "Wrong body format",
    }
  }
  const user_id = await decrypt(Buffer.from(cipher, "base64"))

  return await getSpotifyToken(user_id)
}

module.exports = { handler }
