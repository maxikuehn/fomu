const express = require("express")
const axios = require("axios")
const qs = require("qs")

const router = express.Router()

const client_id = "9076f429c5f3490fa8c08428f47cbd60" // Your client id
const client_secret = "c3363dd311ba4421b79c41d205b1b4f5" // Your secret

router.post("/token", (req, res) => {
  axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "authorization_code",
        code: req.body.code,
        redirect_uri: req.body.href,
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
      res.json(resp.data)
    })
    .catch((error) => {
      console.error(error)
    })
})

router.post("/refresh", (req, res) => {
  console.log("refresh", req.body)
  axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "refresh_token",
        refresh_token: req.body.refresh_token,
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
      res.json(resp.data)
    })
    .catch((error) => {
      console.log("error", error.message)
    })
})

module.exports = router
