import { Tooltip } from "antd"
import { InfoCircleOutlined } from "@ant-design/icons"

const CustomTooltip = ({ content, size }) => {
  return (
    <Tooltip className="px-3" placement="rightBottom" title={content}>
      <InfoCircleOutlined className="text-lg" />
    </Tooltip>
  )
}

export default CustomTooltip
