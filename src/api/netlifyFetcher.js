import axios from "axios"

const BASE_URL = window.location.origin

const netlifyFetcher = axios.create({
  baseURL: new URL("/.netlify/functions", BASE_URL).toString(),
})

netlifyFetcher.interceptors.response.use(
  (value) => value,
  (error) => {
    console.error("netlifyFetcher:", error.message)
    return Promise.reject(error)
  }
)

export default netlifyFetcher
