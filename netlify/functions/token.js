const axios = require("axios")
const qs = require("qs")

const { VITE_SP_CLIENT_SECRET: client_secret, VITE_SP_CLIENT_ID: client_id } =
  process.env

console.log("NODE process.env", process.env)

const handler = async function (event) {
  if (!event.body)
    event.body = {
      href: "http://localhost:8888/callback",
      code: "AQBJy4crFQX8-ceBSZyEnhPUNklBrv_NxObxRbgQwK9p8JsjVeMDybhz94qc29K60zzM13F0IV31LTxwRg_X0fy_NLu_7TrHpIQLgs6yEams-TFmJr1FX9dzGBNxfSb3R8ZkiKZAtNb-AMn_0j6pGZmR70GUPBwHAkSzyxJ7SZIuXG1qnj3uFSyTzlKce9XXM_n0T3VN_1_6FkEVtF3FaYgmlWGuY5giq3X2bq3Fa27EeCK-ekCFSdxTBTxKAZ-EI_Df6XULvuMPmqAMkaI9yQloUlDh1BSPtBxHR7-Sf519JseHSEm_L1H1mYh73r_ahanm7Sn1r68uiMAr2o4pbR_sXixsyWUIjwy459scsGcM8Fu7llZzpcTKz2iiWMH6GnxdzVaqNbz3GjbJRk0sGVy7rHsXGclUPR6CYI5ZriL5ua5iGnaHO8pWpnmME57TJEMgMWM0vDD-_p8go4S9ljNtpz1PmjqnJQ",
    }
  const body = JSON.parse(event.body)
  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "authorization_code",
        code: body.code,
        redirect_uri: body.href,
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
