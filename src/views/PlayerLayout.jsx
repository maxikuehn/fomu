import { Button, Space, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  contextState,
  currentDeviceState,
  deviceListState,
  playerState,
} from "../recoil"
import { PlyrPlayer, PlyrPlaylistAdd } from "../components/player"
import Fade from "../components/Fade"
import { Info, Monitor, PlayCircle, Smartphone, Speaker } from "react-feather"
import { fetchAvailableDevices, playerPlay } from "../services/Spotify"
import _find from "lodash/find"

const Backdrop = ({ context }) => {
  const [devices, setDevices] = useRecoilState(deviceListState)
  const [currentDevice, setCurrentDevice] = useRecoilState(currentDeviceState)

  useEffect(async () => {
    let deviceList = (await fetchAvailableDevices()).devices
    setDevices(deviceList)
    setCurrentDevice(_find(deviceList, "is_active")?.id)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAvailableDevices().then((response) => {
        setDevices(response.devices)
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const deviceElement = ({ id, name, type }) => (
    <Button
      key={id}
      type={id === currentDevice ? "primary" : "default"}
      style={{ height: "auto" }}
      block
      onClick={() => setCurrentDevice(id)}
    >
      <div className="flex gap-2 py-1 items-center">
        {(() => {
          switch (type) {
            case "Computer":
              return <Monitor size={30} />
            case "Smartphone":
              return <Smartphone size={30} />
            case "Speaker":
              return <Speaker size={30} />
          }
        })()}
        <Space direction="vertical" className="flex-1 text-left ">
          <div className="text-ellipsis overflow-hidden max-w-xs text-lg">
            {name}
          </div>
        </Space>
      </div>
    </Button>
  )

  const handleClickStart = () => {
    if (!currentDevice) return
    playerPlay(context, currentDevice)
  }

  return (
    <div className="bg-opacity-90 absolute inset-0 bg-slate-900 flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col gap-2 p-4 border-2 border-primary-400 rounded-lg min-w-[300px]">
        {devices.length > 0 ? (
          <>
            <p className="m-0 px-2">Gerät auswählen:</p>
            {devices.map(deviceElement)}
          </>
        ) : (
          <Tooltip
            className="px-2 flex"
            placement="rightBottom"
            title="Öffne Spotify auf einem beliebigen Gerät, damit es hier erscheint."
          >
            kein Gerät verfügbar
            <Info size={18} className="mx-4" />
          </Tooltip>
        )}
      </div>
      <div
        className="p-4 rounded-t-full flex flex-col justify-center items-center gap-2 h-min 
        text-primary-400 hover:text-primary-500 active:text-primary-700 cursor-pointer text-opacity-100"
        onClick={handleClickStart}
      >
        <PlayCircle size={250} strokeWidth={0.7} className="text-inherit" />
        <p className="text-4xl text-inherit font-semibold m-0 select-none">
          Start Session
        </p>
      </div>
    </div>
  )
}

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
