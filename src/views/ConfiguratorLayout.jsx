import ConfPlaylistList from "../components/configurator/ConfPlaylistList"
import ConfSettings from "../components/configurator/ConfSettings"
import ConfDestination from "../components/configurator/ConfDestination"
import { ArrowRightOutlined } from "@ant-design/icons"

const ConfiguratorLayout = () => {
  return (
    <div className="flex flex-grow justify-evenly  border-0 border-yellow-300 ">
      <ConfPlaylistList />
      <ArrowRightOutlined className="self-center text-5xl" />
      <ConfDestination />
      <ConfSettings />
    </div>
  )
}
export default ConfiguratorLayout
