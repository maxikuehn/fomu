import {
  CnfDestination,
  CnfPlaylistList,
  CnfSettings,
} from "../components/configurator"
import { ArrowRight } from "react-feather"

const ConfiguratorLayout = () => {
  return (
    <div className="flex h-full flex-grow items-center justify-center gap-2 p-2 xl:gap-14">
      <CnfPlaylistList />
      <ArrowRight
        size={60}
        className="min-w-fit self-center text-primary-400"
      />
      <CnfDestination />
      <CnfSettings />
    </div>
  )
}
export default ConfiguratorLayout
