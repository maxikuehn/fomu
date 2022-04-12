import { Button, Space } from "antd"
import { useEffect, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { PlyrPlayer, PlyrPlaylistAdd } from "../components/player"
import { appState, contextState, playerState } from "../recoil"
import { Monitor, PlayCircle, Smartphone, Speaker } from "react-feather"
import Fade from "../components/Fade"
import { fetchAvailableDevices, playerPlay } from "../api/spotify"
import * as _ from "./../../node_modules/lodash"

const Backdrop = ({ context }) => {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState("")

  useEffect(async () => {
    let deviceList = (await fetchAvailableDevices()).devices
    console.log("deviceList", deviceList)
    setDevices(deviceList)
    setSelectedDevice(_.find(deviceList, "is_active")?.id)
  }, [])

  const deviceElement = ({ id, name, type }) => (
    <Button
      key={id}
      type={id === selectedDevice ? "primary" : "default"}
      style={{ height: "auto", width: "100%", margin: "4px" }}
      onClick={() => setSelectedDevice(id)}
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
    if (!selectedDevice) return
    playerPlay(context, selectedDevice)
  }

  return (
    <div className="bg-opacity-90 absolute inset-0 bg-slate-900 flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col items-stretch">
        {devices.map(deviceElement)}
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
  const setApp = useSetRecoilState(appState)
  const context = useRecoilValue(contextState)
  const player = useRecoilValue(playerState)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!player || player.context.uri !== context) setVisible(true)
    else setVisible(false)
  }, [player])

  return (
    <div className="w-full h-full flex flex-row px-8 ">
      <div id="sidebar" className="bg-red-6001 basis-80">
        verlauf
      </div>
      <div id="right" className=" flex-auto flex">
        <PlyrPlayer />
        <PlyrPlaylistAdd />
      </div>
      <Fade show={visible}>
        <Backdrop context={context} />
      </Fade>
    </div>
  )
}
export default PlayerLayout
