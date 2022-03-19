import { DownOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Menu } from "antd"
import Text from "antd/lib/typography/Text"
import { useState } from "react"
import { useRecoilValue, useResetRecoilState } from "recoil"
import currentUserProfileState from "../recoil/currentUserState"
import spotifyAuthState from "../recoil/spotifyAuthState"

const ProfileMenu = () => {
  const handleLogout = useResetRecoilState(spotifyAuthState)
  return (
    <Menu className="rounded-lg">
      <Menu.Item onClick={handleLogout} key="logout2">
        Logout
      </Menu.Item>
    </Menu>
  )
}

const TopBar = (props) => {
  const currentUserProfile = useRecoilValue(currentUserProfileState)
  const [open, setOpen] = useState(0)

  if (!currentUserProfile) return <div />

  return (
    <div
      id="topbar"
      className="border-green-500 border-0 p-4 w-full  flex justify-between items-center"
    >
      <div />
      <Dropdown
        overlay={<ProfileMenu />}
        onVisibleChange={setOpen}
        placement="bottomRight"
        className="bg-primary-active rounded-full select-none"
      >
        <div>
          <Avatar size={45} src={currentUserProfile.images[0].url} />
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
