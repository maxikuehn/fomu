import axios from "axios"

const DEV = import.meta.env.DEV

const firebaseFetcher = axios.create({
  baseURL: DEV
    ? "http://localhost:5001/fomu-app/europe-west1"
    : "https://europe-west1-fomu-app.cloudfunctions.net",
})

firebaseFetcher.interceptors.response.use(
  (value) => value,
  (error) => {
    console.error("firebaseFetcher:", error.message)
    return Promise.reject(error)
  }
)

export default firebaseFetcher
