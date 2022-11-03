import { memo, useEffect, useState } from "react"
import { Badge, Dropdown, Menu, Progress, Space } from "antd"
import _clamp from "lodash/clamp"
import _find from "lodash/find"
import {
  Circle,
  Pause,
  Cast,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Monitor,
  Smartphone,
  Speaker,
} from "react-feather"
import { useRecoilState } from "recoil"
import { deviceListState } from "../../recoil"
import api from "../../api"

const Device = ({ id, name, type }, handleClickDevice, selectedDevice) => ({
  label: name,
  key: id,
  icon: (() => {
    switch (type) {
      case "Computer":
        return <Monitor size={15} />
      case "Smartphone":
        return <Smartphone size={15} />
      case "Speaker":
        return <Speaker size={15} />
    }
  })(),
  onClick: () => handleClickDevice(id),
  className: `${id === selectedDevice && "bg-primary-600"}`,
})

const DeviceList = memo(
  ({ devices, handleClickDevice, selectedDevice }) => {
    return (
      <Menu
        items={
          devices.length === 0
            ? [
                {
                  label: "Keine Geräte verfügbar",
                  key: "nodevice",
                  className: "text-center",
                },
              ]
            : devices.map((d) => Device(d, handleClickDevice, selectedDevice))
        }
      />
    )
  },
  (prevProps, nextProps) => {
    if (prevProps.devices.length !== nextProps.devices.length) {
      return false
    }
    if (prevProps.selectedDevice !== nextProps.selectedDevice) {
      return false
    }
    return true
  }
)

const PlyrControlls = ({
  isPlaying,
  progress: progressPlyr,
  duration,
  repeatState,
  shuffleState,
}) => {
  const [devices, setDevices] = useRecoilState(deviceListState)
  const [selectedDevice, setSelectedDevice] = useState("")
  const [deviceMenuVisible, setDeviceMenuVisible] = useState(false)
  const [progress, setProgress] = useState(progressPlyr)
  const dev = import.meta.env.MODE === "development"

  useEffect(() => {
    ;(async () => {
      let deviceList = await api.player.availableDevices()
      setDevices(deviceList)
      setSelectedDevice(_find(deviceList, "is_active")?.id)
    })()
  }, [])

  useEffect(() => {
    setProgress(progressPlyr)
  }, [progressPlyr])

  useEffect(() => {
    let id
    const incr = 500
    if (isPlaying) {
      id = setInterval(() => {
        setProgress((p) => p + incr)
      }, incr)
    } else {
      clearInterval(id)
    }
    return () => clearInterval(id)
  }, [isPlaying])

  let interval
  useEffect(() => {
    if (deviceMenuVisible) {
      interval = setInterval(
        async () => {
          const devices = await api.player.availableDevices()
          setDevices(devices)
          setSelectedDevice(_find(devices, "is_active")?.id)
        },
        dev ? 500 : 1000
      )
    } else clearInterval(interval)
    return () => clearInterval(interval)
  }, [deviceMenuVisible])

  const iconProps = {
    size: 40,
    className:
      "text-primary-400 hover:text-primary-500 active:text-primary-600 cursor-pointer",
  }

  const handleClickDevice = async (id) => {
    setSelectedDevice(id)
    await api.player.transferPlayback(id)
    setDeviceMenuVisible(false)
  }

  const handleClickRepeat = () => {
    const ARepeatState = ["off", "track", "context"]
    const index = ARepeatState.indexOf(repeatState)
    const nextIndex = (index + 1) % ARepeatState.length
    api.player.setRepeat(ARepeatState[nextIndex])
  }

  const handleSeek = (e) => {
    const width = document.getElementById("plyr-progress").offsetWidth
    var pos = e.clientX - e.target.getBoundingClientRect().left //x position within the element.
    const seekMs = _clamp(Math.floor((pos / width) * duration), 0, duration)
    api.player.seekPosition(seekMs)
  }

  const formatMinute = (ms) => {
    const m = Math.floor(ms / 1000 / 60)
    const s = Math.floor((ms / 1000) % 60)
    return `${m}:${s < 10 ? "0" : ""}${s}`
  }

  return (
    <div className=" flex w-full flex-col px-2" id="container">
      <Space className=" justify-center" size={40} align="center">
        <Badge
          count={
            shuffleState ? (
              <Circle className="fill-primary-400 text-primary-400" size={12} />
            ) : (
              0
            )
          }
          offset={[5, 0]}
          color={"#285e94"}
        >
          <Shuffle
            {...iconProps}
            onClick={() => api.player.setShuffle(!shuffleState)}
          />
        </Badge>
        <SkipBack {...iconProps} onClick={() => api.player.previousTrack()} />
        {isPlaying ? (
          <Pause {...iconProps} onClick={() => api.player.pause()} />
        ) : (
          <Play {...iconProps} onClick={() => api.player.play()} />
        )}
        <SkipForward {...iconProps} onClick={() => api.player.nextTrack()} />
        <Badge
          count={
            repeatState === "off" ? (
              0
            ) : (
              <Circle className="fill-primary-400 text-primary-400" size={12} />
            )
          }
          offset={[5, 0]}
          color={"#285e94"}
        >
          <Repeat {...iconProps} onClick={handleClickRepeat} />
        </Badge>
        <Dropdown
          trigger={["click"]}
          overlay={
            <DeviceList
              devices={devices}
              selectedDevice={selectedDevice}
              handleClickDevice={handleClickDevice}
            />
          }
          placement="topLeft"
          onOpenChange={(open) => setDeviceMenuVisible(open)}
          open={deviceMenuVisible}
        >
          <Cast {...iconProps} />
        </Dropdown>
      </Space>
      <div className="flex gap-1" direction="horizontal">
        <span className="w-10 text-right text-primary-300">
          {formatMinute(progress)}
        </span>
        <Progress
          id="plyr-progress"
          className="cursor-pointer"
          percent={(progress / duration ?? 0) * 100}
          showInfo={false}
          strokeColor={"#285e94"}
          onClick={handleSeek}
        />
        <span className="w-10 text-primary-300">{formatMinute(duration)}</span>
      </div>
    </div>
  )
}
export default PlyrControlls
