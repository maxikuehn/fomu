import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { contextState, playerState } from "../recoil"
import { PlyrPlayer, PlyrPlaylistAdd } from "../components/player"
import Fade from "../components/Fade"
import _find from "lodash/find"
import Backdrop from "./Backdrop"

const PlayerLayout = () => {
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
        className={`w-full h-full flex flex-row px-8 ${
          visible && "grayscale blur-sm"
        }`}
      >
        <div id="sidebar" className="basis-80">
          verlauf wip
        </div>
        <div id="right" className="flex-auto flex">
          <PlyrPlayer />
          <PlyrPlaylistAdd />
        </div>
      </div>
      <Fade show={visible}>
        <Backdrop context={context} />
      </Fade>
    </>
  )
}
export default PlayerLayout
