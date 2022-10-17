import axios from "axios"

const DEV = import.meta.env.DEV

const firebaseFetcher = axios.create({
  baseURL: DEV
    ? "http://localhost:5001/fomu-app/europe-west1"
    : "https://europe-west1-fomu-app.cloudfunctions.net",
})

firebaseFetcher.interceptors.response.use(
  (value) => {
    console.log("firebaseFetcher response -- NO ERROR")
  },
  (error) => {
    console.log("firebaseFetcher response -- ERROR", error)
  }
)

export default firebaseFetcher
