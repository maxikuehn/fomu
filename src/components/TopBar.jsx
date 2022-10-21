import { DownOutlined, LeftOutlined } from "@ant-design/icons"
import { Avatar, Button, Dropdown, Menu, Modal } from "antd"
import Text from "antd/lib/typography/Text"
import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { appState, currentUserState, logout } from "../recoil"
import { EAppState } from "../types"
import AccountDialog from "./AccountDialog"
import WeeklyDialog from "./WeeklyDialog"

const dev = import.meta.env.DEV

const TopBar = () => {
  const currentUserProfile = useRecoilValue(currentUserState)
  const [app, setApp] = useRecoilState(appState)
  const [open, setOpen] = useState(0)
  const [openWeekly, setOpenWeekly] = useState(false)
  const [openAccount, setOpenAccount] = useState(false)

  if (!currentUserProfile) return <div />

  const items = dev
    ? [
        {
          label: "Mix der Woche",
          onClick: () => setOpenWeekly(true),
          key: "weekly",
        },
      ]
    : []
  items.push(
    ...[
      { label: "Account", onClick: () => setOpenAccount(true), key: "account" },
      { label: "Logout", onClick: logout, key: "logout2" },
    ]
  )

  const ProfileMenu = () => <Menu className="rounded-lg" items={items} />

  return (
    <>
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
        className="border-green-500 border- p-4 w-full flex justify-between items-center z-10"
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
        <Dropdown
          overlay={<ProfileMenu />}
          onOpenChange={setOpen}
          trigger="click"
          placement="bottomRight"
          className="bg-primary-400 rounded-full select-none cursor-pointer"
        >
          <div>
            <Avatar
              size={45}
              src={currentUserProfile.images[0]?.url}
              alt="Spotify Account Profile Picture"
            />
            <Text strong underline className="p-2">
              {currentUserProfile.display_name}
            </Text>
            <DownOutlined size={"lg"} rotate={open ? 180 : 0} className="p-2" />
          </div>
        </Dropdown>
      </div>
    </>
  )
}
export default TopBar
