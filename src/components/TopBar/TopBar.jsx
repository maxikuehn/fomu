import { DownOutlined, LeftOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Dropdown, Menu } from "antd"
import Text from "antd/lib/typography/Text"
import { useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  appState,
  currentUserState,
  logout,
  spotifyAuthState,
} from "../../recoil"
import { EAppState } from "../../types"
import AccountDialog from "./AccountDialog"
import InformationDialog from "./InformationDialog"
import WeeklyDialog from "./WeeklyDialog"

const dev = import.meta.env.DEV

const TopBar = () => {
  const currentUserProfile = useRecoilValue(currentUserState)
  const [app, setApp] = useRecoilState(appState)
  const [open, setOpen] = useState(0)
  const [openWeekly, setOpenWeekly] = useState(false)
  const [openAccount, setOpenAccount] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)
  const setAuth = useSetRecoilState(spotifyAuthState)

  if (!currentUserProfile) return <div />

  const items = [
    {
      label: "Über diese App",
      onClick: () => setOpenInfo(true),
      key: "info",
    },
    {
      onlydev: false,
      label: "Mix der Woche",
      onClick: () => setOpenWeekly(true),
      key: "weekly",
    },
    { label: "Account", onClick: () => setOpenAccount(true), key: "account" },
    { label: "Logout", onClick: logout, key: "logout2" },
  ]
    .filter((p) => dev || !p.onlydev)
    .map(({ label, onClick, key }) => ({ label, onClick, key }))

  return (
    <>
      <InformationDialog
        open={openInfo}
        handleClose={() => setOpenInfo(false)}
      />
      <AccountDialog
        open={openAccount}
        handleClose={() => setOpenAccount(false)}
      />
      <WeeklyDialog
        open={openWeekly}
        handleClose={() => setOpenWeekly(false)}
      />
      <div
        id="topbar"
        className="z-10 flex w-full items-center justify-between p-4"
      >
        {app === EAppState.Player && (
          <Button
            icon={<LeftOutlined />}
            onClick={() => setApp(EAppState.Configuration)}
          >
            Einstellungen
          </Button>
        )}
        <div />
        {dev && (
          <Button
            onClick={() => {
              setAuth((state) => ({
                access_token: "reset",
                name: state.name,
              }))
              window.location.reload()
            }}
          >
            trigger auth refresh
          </Button>
        )}
        <Dropdown
          menu={{ items }}
          onOpenChange={setOpen}
          trigger="click"
          placement="bottomRight"
          className="h-11 translate-y-[3px] cursor-pointer select-none rounded-full bg-primary-400"
        >
          <div>
            <div className="-translate-y-[3px]">
              <Avatar
                size={50}
                src={currentUserProfile.images[0]?.url}
                icon={<UserOutlined />}
                alt="Spotify Account Profile Picture"
                className="shadow-lg shadow-black"
                style={{ backgroundColor: "grey" }}
              />
              <Text strong underline className="pl-4 pr-2">
                {currentUserProfile.display_name}
              </Text>
              <DownOutlined
                size={"lg"}
                rotate={open ? 180 : 0}
                className="p-2"
              />
            </div>
          </div>
        </Dropdown>
      </div>
    </>
  )
}
export default TopBar
