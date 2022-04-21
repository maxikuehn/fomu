import { Badge, Button as AButton, Progress, Space } from "antd"
import {
  Circle,
  Pause,
  Cast,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "react-feather"
import {
  playerPause,
  playerPlay,
  playerSetRepeat,
  playerSetShuffle,
  playerSkipToNext,
  playerSkipToPrevious,
} from "../../services/Spotify"

const Button = ({ icon }) => {
  return <AButton icon={icon} shape="circle" className="w-12 h-12" />
}

const PlyrControlls = ({
  isPlaying,
  progress,
  duration,
  repeatState,
  shuffleState,
}) => {
  const iconProps = {
    size: 40,
    className:
      "text-primary-400 hover:text-primary-500 active:text-primary-600 cursor-pointer",
  }

  const handleClickRepeat = () => {
    const ARepeatState = ["off", "track", "context"]
    const index = ARepeatState.indexOf(repeatState)
    const nextIndex = (index + 1) % ARepeatState.length
    playerSetRepeat(ARepeatState[nextIndex])
  }

  return (
    <div className=" w-full flex flex-col px-2">
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
            onClick={() => playerSetShuffle(!shuffleState)}
          />
        </Badge>
        <SkipBack {...iconProps} onClick={() => playerSkipToPrevious()} />
        {isPlaying ? (
          <Pause {...iconProps} onClick={() => playerPause()} />
        ) : (
          <Play {...iconProps} onClick={() => playerPlay()} />
        )}
        <SkipForward {...iconProps} onClick={() => playerSkipToNext()} />
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
      </Space>
      <Progress
        percent={(progress / duration ?? 0) * 100} // 150
        showInfo={false}
        strokeColor={"#285e94"}
        onClick={(e) => {
          const percent = e.nativeEvent.offsetX / e.target.offsetWidth
        }}
      />
    </div>
  )
}
export default PlyrControlls
