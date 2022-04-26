import { InfoCircleOutlined } from "@ant-design/icons"
import { Badge, Tooltip } from "antd"

const CnfContainer = ({ title, badgeCount, tooltip, children }) => {
  return (
    <div className="max-h-[85vh] max-w-[400px] flex-1 flex flex-col select-none">
      <div className="px-4 py-2 flex items-center flex-nowrap">
        <span className="text-2xl font-semibold whitespace-nowrap">
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
      <div className="p-2 border-2 border-primary-400 rounded overflow-auto custom-scrollbar flex flex-col gap-1">
        {children}
      </div>
    </div>
  )
}
export default CnfContainer
