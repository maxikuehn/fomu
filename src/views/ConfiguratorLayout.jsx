import { ArrowRightOutlined } from "@ant-design/icons"
import {
  CnfDestination,
  CnfPlaylistList,
  CnfSettings,
} from "../components/configurator"
import { ArrowRight } from "react-feather"

const ConfiguratorLayout = () => {
  return (
    <div className="flex flex-grow justify-center gap-6">
      <CnfPlaylistList />
      <ArrowRight size={60} className="self-center text-primary-400" />
      <CnfDestination />
      <CnfSettings />
    </div>
  )
}
export default ConfiguratorLayout
