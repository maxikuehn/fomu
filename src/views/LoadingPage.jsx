import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { requestAccessToken } from "../services/Spotify"

const LoadingPage = () => {
  let navigate = useNavigate()

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code")
    if (!code) return
    const href = window.location.href
    requestAccessToken(href, code).then(() => {
      navigate("/")
    })
  }, [])

  return (
    <div className="w-screen h-screen absolute top-0 bg-background flex justify-center items-center">
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 100,
            }}
          />
        }
      />
    </div>
  )
}
export default LoadingPage
