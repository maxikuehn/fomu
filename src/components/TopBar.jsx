import { DownOutlined, LeftOutlined } from "@ant-design/icons"
import { Avatar, Button, Dropdown, Menu, Modal } from "antd"
import Text from "antd/lib/typography/Text"
import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { appState, currentUserState, resetStates } from "../recoil"
import { EAppState } from "../types"
import WeeklyDialog from "./WeeklyDialog"

const TopBar = () => {
  const currentUserProfile = useRecoilValue(currentUserState)
  const [app, setApp] = useRecoilState(appState)
  const [open, setOpen] = useState(0)
  const [openWeekly, setOpenWeekly] = useState(false)

  if (!currentUserProfile) return <div />

  const ProfileMenu = () => (
    <Menu
      className="rounded-lg"
      items={[
        {
          label: "Mix der Woche",
          onClick: () => setOpenWeekly(true),
          key: "weekly",
        },
        { label: "Logout", onClick: resetStates, key: "logout2" },
      ]}
    />
  )

  return (
    <>
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
              src={currentUserProfile.images[0].url}
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
