import { LoadingOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { requestAccessToken } from "../api/spotify"

const LoadingPage = () => {
  let navigate = useNavigate()

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code")
    if (!code) return
    requestAccessToken(code).then(() => {
      navigate("/")
    })
  }, [])

  return (
    <div className="h-full flex justify-center items-center">
      <div>
        <LoadingOutlined style={{ fontSize: "75px" }} />
      </div>
    </div>
  )
}
export default LoadingPage
