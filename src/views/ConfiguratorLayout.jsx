import { Button } from "antd"
import {
  CnfDestination,
  CnfPlaylistList,
  CnfSettings,
} from "../components/configurator"
import { useState } from "react"
import { ArrowRight } from "react-feather"
import { mobileState } from "../recoil"
import { useRecoilValue } from "recoil"

const ConfiguratorLayout = () => {
  const [step, setStep] = useState(0)
  const mobile = useRecoilValue(mobileState)

  return (
    <div className="relative h-full flex-col">
      <div className="absolute inset-0 bottom-8 flex flex-grow items-center justify-center gap-2 p-2 md:bottom-0 xl:gap-14">
        {(!mobile || step === 0) && <CnfPlaylistList />}
        <ArrowRight
          size={60}
          className="hidden min-w-fit self-center text-primary-400 md:block"
        />
        {(!mobile || step === 1) && <CnfDestination />}
        {(!mobile || step === 2) && <CnfSettings />}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 px-2 md:hidden">
        <Button
          type="primary"
          className="flex-1"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
        >
          prev
        </Button>
        <Button
          type="primary"
          className="flex-1"
          onClick={() => setStep(step + 1)}
          disabled={step === 2}
        >
          next
        </Button>
      </div>
    </div>
  )
}
export default ConfiguratorLayout
