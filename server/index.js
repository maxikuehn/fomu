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
const path = require("path")

const app = express()
const port = 3001

const whitelist = ["http://localhost:3001"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, "..", "dist")))
app.use(express.static("public"))

const SPOTIFY_BASE_API = "https://api.spotify.com/v1"
const SPOTIFY_BASE_AUTH = "https://accounts.spotify.com"

const client_id = "9076f429c5f3490fa8c08428f47cbd60" // Your client id
const client_secret = "c3363dd311ba4421b79c41d205b1b4f5" // Your secret
const redirect_uri = "http://localhost:3001/callback"
const scope = "user-read-private user-read-email"

app.get("/token", (req, res) => {
  console.log(req.body)
  axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: href,
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
      console.log("error", error.message, href, REDIRECT_APPENDIX)
      return error
    })
})

app.get("/refresh", (req, res) => {
  console.log(req.body)
  axios
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
})

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"))
})

app.listen(port, () => {
  console.log("server started on port", port)
})
