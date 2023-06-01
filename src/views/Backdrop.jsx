import { Button, Space, Tooltip } from "antd"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { currentDeviceState, deviceListState } from "../recoil"
import { Info, Monitor, PlayCircle, Smartphone, Speaker } from "react-feather"
import _find from "lodash/find"
import api from "../api"

const Backdrop = ({ context }) => {
  const [devices, setDevices] = useRecoilState(deviceListState)
  const [currentDevice, setCurrentDevice] = useRecoilState(currentDeviceState)

  useEffect(() => {
    ; async () => {
      let deviceList = await api.player.availableDevices()
      setDevices(deviceList)
      setCurrentDevice(_find(deviceList, "is_active")?.id)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      const devices = await api.player.availableDevices()
      setDevices(devices)
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
      <div className="flex items-center gap-2 py-1">
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
          <div className="max-w-xs overflow-hidden text-ellipsis text-lg">
            {name}
          </div>
        </Space>
      </div>
    </Button>
  )

  const handleClickStart = () => {
    if (!currentDevice) return
    api.player.playContext({ context_uri: context, device_id: currentDevice })
  }

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center gap-8 bg-slate-900 bg-opacity-90"
      id="Backdrop"
    >
      <div className="flex min-w-[300px] flex-col gap-2 rounded-lg border-2 border-primary-400 p-4">
        {devices.length > 0 ? (
          <>
            <p className="m-0 px-2">Gerät auswählen:</p>
            {devices.map(deviceElement)}
          </>
        ) : (
          <Tooltip
            className="flex px-2"
            placement="rightBottom"
            title="Öffne Spotify auf einem beliebigen Gerät, damit es hier erscheint."
          >
            kein Gerät verfügbar
            <Info size={18} className="mx-4" />
          </Tooltip>
        )}
      </div>
      <div
        className="flex h-min cursor-pointer flex-col items-center justify-center gap-2 rounded-t-full 
        p-4 text-primary-400 text-opacity-100 hover:text-primary-500 active:text-primary-700"
        onClick={handleClickStart}
      >
        <PlayCircle size={250} strokeWidth={0.7} className="text-inherit" />
        <p className="m-0 select-none text-4xl font-semibold text-inherit">
          Session starten
        </p>
      </div>
    </div>
  )
}

export default Backdrop
