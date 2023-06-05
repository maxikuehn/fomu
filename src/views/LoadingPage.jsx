import { LoadingOutlined } from "@ant-design/icons"
import { Button, Spin } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import api from "../api"
import { appLoadingState, logout, spotifyAuthState } from "../recoil"

const LoadingPage = () => {
  const navigate = useNavigate()
  const setAuthState = useSetRecoilState(spotifyAuthState)
  const setAppLoading = useSetRecoilState(appLoadingState)
  const [showLogout, setShowLogout] = useState(false)

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code")
    navigate("/")
    if (!code) return
    setAppLoading(true)
    api.token.get(code).then((data) => {
      if (data !== undefined) setAuthState(data)
    })
  }, [])

  useEffect(() => {
    setShowLogout(false)
    const timer = setTimeout(() => {
      setShowLogout(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col gap-12">
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 100,
              }}
            />
          }
        />
        <div className="h-8">
          {showLogout && <Button onClick={logout}>Abmelden</Button>}
        </div>
      </div>
    </div>
  )
}
export default LoadingPage
