import { Image } from "antd"
import { PlayCircle, PlusSquare, Trash } from "react-feather"
import { useRecoilValue, useSetRecoilState } from "recoil"
import api from "../../api"
import {
  contextIdState,
  contextState,
  listeningHistoryState,
  toggleDeleted,
} from "../../recoil"

const PlyrHistoryEntry = ({
  uri,
  name,
  artists,
  image,
  deleted,
  showDeleted,
}) => {
  const setListeningHistory = useSetRecoilState(listeningHistoryState)
  const contextId = useRecoilValue(contextIdState)
  const context = useRecoilValue(contextState)

  const spanClass = "whitespace-nowrap text-ellipsis overflow-hidden "
  let show = !deleted || showDeleted
  return (
    <div
      id="PlayerHistoryEntry"
      className={`flex gap-1 w-full px-1 overflow-hidden border rounded border-borderGrey transition-all duration-500 ${
        show ? "h-[54px] py-1 mb-1" : "h-0 mb-[-2px] opacity-0"
      }`}
    >
      <Image
        src={image}
        width={44}
        preview={false}
        alt="ListeningHistoryEntryImage"
      />
      <div className="flex flex-col flex-1 w-0">
        <span
          onClick={() => window.open(uri, "_self")}
          className={
            spanClass +
            "cursor-pointer underline decoration-transparent hover:decoration-primary-300 hover:text-primary-300 transition-all duration-300"
          }
        >
          {name}
        </span>
        <span className={spanClass}>
          {artists
            .map((a, i) => (
              <span
                onClick={() => window.open(a.uri, "_self")}
                className="cursor-pointer underline text-sm decoration-transparent hover:decoration-primary-300 hover:text-primary-300 transition-all duration-300"
                key={i}
              >
                {a.name}
              </span>
            ))
            .reduce((prev, curr) => [prev, ", ", curr])}
        </span>
      </div>
      <div className="flex gap-1">
        {false && (
          <PlayCircle
            size={22}
            strokeWidth={1.2}
            className="self-center stroke-primary-300 cursor-pointer"
            onClick={() =>
              api.player.playTrack({ position: 0, context_uri: context })
            }
          />
        )}
        <PlusSquare
          size={22}
          strokeWidth={1.2}
          className="self-center stroke-primary-300 cursor-pointer"
          onClick={() => api.player.addToQueue(uri, true)}
        />
        <Trash
          size={22}
          strokeWidth={1.2}
          className={`self-center stroke-red-800 ${
            deleted ? "grayscale" : "cursor-pointer"
          }`}
          onClick={() => {
            api.playlist
              .removeTracks(contextId, [uri])
              .then(() =>
                setListeningHistory((history) => toggleDeleted(history, uri))
              )
          }}
        />
      </div>
    </div>
  )
}

export default PlyrHistoryEntry
