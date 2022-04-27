import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { contextState, historyOpenState, playerState } from "../recoil"
import { PlyrPlayer, PlyrPlaylistAdd } from "../components/player"
import Fade from "../components/Fade"
import _find from "lodash/find"
import Backdrop from "./Backdrop"
import PlyrHistory from "../components/player/PlyrHistory"
import { Button } from "antd"
import { RightOutlined } from "@ant-design/icons"

const PlayerLayout = () => {
  const [historyOpen, setHistoryOpen] = useRecoilState(historyOpenState)
  const context = useRecoilValue(contextState)
  const player = useRecoilValue(playerState)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!player || !player.context || player.context.uri !== context)
      setVisible(true)
    else setVisible(false)
  }, [player])

  return (
    <>
      <div
        className={`w-full h-full ${visible && "grayscale blur-sm"}`}
        id="PlayerLayout"
      >
        <PlyrHistory />
        <div className={`flex h-full justify-around`} id="PlayerContainer">
          <div
            className={`px-4 py-2 transition-dimension duration-500 ${
              historyOpen ? "w-96" : "w-56"
            }`}
            id="PlayerSpacerLeft"
          >
            <Button
              size="small"
              icon={<RightOutlined />}
              onClick={() => setHistoryOpen(true)}
            >
              Wiedergabeverlauf
            </Button>
          </div>
          <PlyrPlayer />
          <PlyrPlaylistAdd />
          <div
            id="PlayerSpacerRight"
            className={`transition-dimension duration-500 ${
              historyOpen ? "w-0" : "lg:w-16"
            }`}
          />
        </div>
      </div>
      <Fade show={visible}>
        <Backdrop context={context} />
      </Fade>
    </>
  )
}
export default PlayerLayout
