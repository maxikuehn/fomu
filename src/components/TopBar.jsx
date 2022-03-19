import { Avatar, Dropdown, Menu } from "antd"
import Text from "antd/lib/typography/Text"
import { useRecoilValue, useResetRecoilState } from "recoil"
import currentUserProfileState from "../recoil/currentUserState"
import spotifyAuthState from "../recoil/spotifyAuthState"

import Button from "./Button"

const menu = () => (
  <Menu>
    <Menu.Item key="logout">logout</Menu.Item>
  </Menu>
)

const TopBar = (props) => {
  const handleLogout = useResetRecoilState(spotifyAuthState)
  const currentUserProfile = useRecoilValue(currentUserProfileState)

  if (!currentUserProfile) return <div />

  return (
    <div
      id="topbar"
      className="bg-green-500 w-full h-16 flex justify-evenly items-center"
    >
      <Button handleClick={handleLogout} label="Logout" />
      <Dropdown
        overlay={menu}
        trigger="click"
        placement="bottomRight"
        className="bg-primary-active rounded-full select-none"
      >
        <div>
          <Avatar size={50} src={currentUserProfile.images[0].url} />
          <Text strong className="pl-2 pr-4">
            {currentUserProfile.display_name}
          </Text>
        </div>
      </Dropdown>
    </div>
  )
}
export default TopBar
