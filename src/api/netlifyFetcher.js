import axios from "axios"

const BASE_URL = window.location.origin

const netlifyFetcher = axios.create({
  baseURL: new URL("/.netlify/functions", BASE_URL).toString(),
})

netlifyFetcher.interceptors.response.use(
  (value) => {
    console.log("netlifyFetcher response -- NO ERROR")
  },
  (error) => {
    console.log("netlifyFetcher response -- ERROR", error)
  }
)

export default netlifyFetcher
