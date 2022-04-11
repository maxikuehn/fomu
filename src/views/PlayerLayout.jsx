import Player from "../components/player/player"

const PlayerLayout = () => {
  return (
    <div className="w-full h-full flex flex-row">
      <div id="sidebar" className="bg-red-600 basis-80">
        verlauf
      </div>

      <div id="right" className="bg-yellow-400 flex-auto flex flex-col">
        <div id="player" className="flex-auto flex">
          <Player />
          <div className="bg-blue-600 basis-80">playlistAdd</div>
        </div>
      </div>
    </div>
  )
}
export default PlayerLayout
