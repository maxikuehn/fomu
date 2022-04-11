import { PlyrPlayer, PlyrPlaylistAdd } from "../components/player"

const PlayerLayout = () => {
  return (
    <div className="w-full h-full flex flex-row">
      <div id="sidebar" className="bg-red-600 basis-80">
        verlauf
      </div>

      <div id="right" className=" flex-auto flex flex-col">
        <div id="player" className="flex-auto flex">
          <PlyrPlayer />
          <PlyrPlaylistAdd />
        </div>
      </div>
    </div>
  )
}
export default PlayerLayout
