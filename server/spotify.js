/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

//var url = require("url")
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
const port = 3001
const _axios = require("axios")
const axios = _axios.create({
  baseURL: "https://api.spotify.com/v1",
})

const SPOTIFY_BASE_API = "https://api.spotify.com/v1"
const SPOTIFY_BASE_AUTH = "https://accounts.spotify.com"

const client_id = "9076f429c5f3490fa8c08428f47cbd60" // Your client id
const client_secret = "c3363dd311ba4421b79c41d205b1b4f5" // Your secret
const redirect_uri = "http://localhost:3000/callback"
const scope = "user-read-private user-read-email"

const generateRandomString = (length) => {
  let text = ""
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

app.get("/auth", (req, res) => {
  const url = new URL("/authorize", SPOTIFY_BASE_AUTH)
  url.searchParams.append("client_id", client_id)
  url.searchParams.append("response_type", "code")
  url.searchParams.append("redirect_uri", redirect_uri)
  url.searchParams.append("state", generateRandomString(16))
  url.searchParams.append("scope", scope)
  // url.searchParams.append(code_challenge_method, "S256")
  // url.searchParams.append(code_challenge, "")

  res.redirect(301, url.toString())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get("/callback", (req, res) => {
  res.send("past")
})
