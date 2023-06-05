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
  const mobile = useRecoilValue(mobileState);

  return (
    <div className="h-full relative flex-col">

      <div className="flex flex-grow items-center justify-center gap-2 p-2 xl:gap-14 absolute inset-0 bottom-8 md:bottom-0">
        {(!mobile || step === 0) && <CnfPlaylistList />
        }
        <ArrowRight
          size={60}
          className="min-w-fit self-center text-primary-400 hidden md:block"
        />
        {(!mobile || step === 1) && <CnfDestination />}
        {(!mobile || step === 2) && <CnfSettings />}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 md:hidden px-2">
        <Button
          type="primary"
          className="flex-1"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
        >prev</Button>
        <Button
          type="primary"
          className="flex-1"
          onClick={() => setStep(step + 1)}
          disabled={step === 2}
        >next</Button>
      </div>
    </div >
  )
}
export default ConfiguratorLayout
