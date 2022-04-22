import { DownOutlined, LeftOutlined } from "@ant-design/icons"
import { Avatar, Button, Dropdown, Menu } from "antd"
import Text from "antd/lib/typography/Text"
import { useState } from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import {
  appState,
  contextState,
  currentUserState,
  deleteTracksState,
  inputPlaylistState,
  joinPlaylistState,
  outputPlaylistState,
  spotifyAuthState,
} from "../recoil"
import { EAppState } from "../types"

const ProfileMenu = () => {
  const resetJoin = useResetRecoilState(joinPlaylistState)
  const resetDelete = useResetRecoilState(deleteTracksState)
  const resetApp = useResetRecoilState(appState)
  const resetInput = useResetRecoilState(inputPlaylistState)
  const resetOutput = useResetRecoilState(outputPlaylistState)
  const resetAuth = useResetRecoilState(spotifyAuthState)
  const resetContext = useResetRecoilState(contextState)

  const handleLogout = () => {
    resetJoin()
    resetDelete()
    resetApp()
    resetInput()
    resetOutput()
    resetAuth()
    resetContext()
    localStorage.clear()
  }
  return (
    <Menu className="rounded-lg">
      <Menu.Item onClick={handleLogout} key="logout2">
        Logout
      </Menu.Item>
    </Menu>
  )
}

const TopBar = () => {
  const currentUserProfile = useRecoilValue(currentUserState)
  const [app, setApp] = useRecoilState(appState)
  const [open, setOpen] = useState(0)

  if (!currentUserProfile) return <div />

  return (
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
        onVisibleChange={setOpen}
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
  )
}
export default TopBar
