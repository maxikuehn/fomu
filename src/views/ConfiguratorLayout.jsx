import {
  CnfDestination,
  CnfPlaylistList,
  CnfSettings,
} from "../components/configurator"
import { ArrowRight } from "react-feather"

const ConfiguratorLayout = () => {
  return (
    <div className="flex flex-grow justify-center gap-2 xl:gap-14 p-2">
      <CnfPlaylistList />
      <ArrowRight
        size={60}
        className="self-center text-primary-400 min-w-fit"
      />
      <CnfDestination />
      <CnfSettings />
    </div>
  )
}
export default ConfiguratorLayout
