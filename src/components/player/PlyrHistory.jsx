import { LeftOutlined } from "@ant-design/icons"
import { Button, Checkbox } from "antd"
import { forwardRef, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { historyOpenState, listeningHistoryState } from "../../recoil"
import PlyrHistoryEntry from "./PlyrHisroyEntry"
import FlipMove from "react-flip-move"

const FunctionalPlyrHistoryEntry = forwardRef((props, ref) => (
  <div ref={ref}>
    <PlyrHistoryEntry {...props} />
  </div>
))

const PlyrHistory = () => {
  const listeningHistory = useRecoilValue(listeningHistoryState)
  const [historyOpen, setHistoryOpen] = useRecoilState(historyOpenState)
  const [showDeleted, setShowDeleted] = useState(false)

  return (
    <div
      id="PlayerHistory"
      className={`fixed left-0 z-10 h-[calc(100vh-77px-40px)] transition-dimension duration-300 ${historyOpen ? "w-full md:w-96" : "w-0"
        } overflow-hidden bg-background`}
    >
      <div id="sidebar" className="flex h-full w-full flex-col gap-2 p-2 px-4">
        <div className="mr-[10px] flex">
          <Button
            size="small"
            icon={<LeftOutlined />}
            onClick={() => setHistoryOpen(false)}
            className="mr-8 flex-1 text-left"
          ></Button>
          <span
            className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap pr-2 text-right"
            onClick={() => setShowDeleted(!showDeleted)}
          >
            gelöschte Tracks anzeigen
          </span>
          <Checkbox
            checked={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
          />
        </div>
        <div className="custom-scrollbar relative h-full overflow-x-hidden overflow-y-scroll pr-1">
          <FlipMove>
            {listeningHistory.map((props) => (
              <FunctionalPlyrHistoryEntry
                {...props}
                key={props.uri}
                showDeleted={showDeleted}
              />
            ))}
          </FlipMove>
        </div>
      </div>
    </div>
  )
}

export default PlyrHistory
