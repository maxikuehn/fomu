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
        className={`${visible && "blur-sm grayscale"} h-full`}
        id="PlayerLayout"
      >
        <PlyrHistory />
        <div
          className={`flex h-full flex-col justify-between md:flex-row`}
          id="PlayerContainer"
        >
          <div
            className={`px-4 py-2 transition-dimension duration-500 md:w-96`}
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
          <div className="grow md:grow-0 relative md:order-last w-full md:max-w-md">
            <div className="absolute top-0 bottom-0 right-0 left-0">
              <PlyrPlaylistAdd />
            </div>
          </div>
          <PlyrPlayer />
        </div>
      </div >
      <Fade show={visible}>
        <Backdrop context={context} />
      </Fade>
    </>
  )
}
export default PlayerLayout
