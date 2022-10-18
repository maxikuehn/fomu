import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import api from "../api"
import { spotifyAuthState } from "../recoil"

const LoadingPage = () => {
  let navigate = useNavigate()
  const setAuthState = useSetRecoilState(spotifyAuthState)

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code")
    if (!code) navigate("/")
    api.token.get(code).then((data) => {
      if (data !== undefined) setAuthState(data)
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
