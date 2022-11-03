import { InfoCircleOutlined } from "@ant-design/icons"
import { Badge, Tooltip } from "antd"

const CnfContainer = ({ title, badgeCount, tooltip, children }) => {
  return (
    <div className="flex max-h-[calc(100vh-151px)] max-w-[400px] flex-1 select-none flex-col">
      <div className="flex flex-nowrap items-center px-4 py-2">
        <span className="whitespace-nowrap text-2xl font-semibold">
          {title}
        </span>
        {tooltip && (
          <Tooltip className="px-3" placement="rightBottom" title={tooltip}>
            <InfoCircleOutlined className="text-lg" />
          </Tooltip>
        )}

        <div className="flex-auto" />
        <Badge
          count={badgeCount}
          style={{ backgroundColor: "rgb(25 64 110 / 1)" }}
        />
      </div>
      <div className="custom-scrollbar flex flex-col gap-1 overflow-auto rounded border-2 border-primary-400 p-2">
        {children}
      </div>
    </div>
  )
}
export default CnfContainer
