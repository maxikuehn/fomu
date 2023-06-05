import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import api from "../api"
import { spotifyAuthState } from "../recoil"

const LoadingPage = () => {
  const navigate = useNavigate()
  const setAuthState = useSetRecoilState(spotifyAuthState)

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code")
    navigate("/")
    if (!code) return
    api.token.get(code).then((data) => {
      if (data !== undefined) setAuthState(data)
    })
  }, [])

  return (
    <div className="absolute top-0 flex h-screen w-screen items-center justify-center bg-background">
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
