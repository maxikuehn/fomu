import { Image, Space, Typography } from "antd"
import heartInactive from "./../../../assets/icons/heart-64.png"
import heartActive from "./../../../assets/icons/heart-64-active.png"

const { Text } = Typography

const PlyrTrack = ({ track }) => {
  console.log("track", track)

  if (!track) {
    return <div></div>
  }

  const { name, artists, album } = track

  return (
    <Space direction="vertical">
      <Image
        src={album.images[0].url}
        preview={false}
        width={"60vh"}
        height={"60vh"}
        alt="CurrentTrackCoverImage"
      />
      <div className="flex justify-between items-center">
        <Space direction="vertical" size={0}>
          <Text strong>{name}</Text>
          <Text>{artists.map((a) => a.name).join(", ")}</Text>
        </Space>
        {/* <Image height={35} width={35} src={heartInactive} preview={false} /> */}
      </div>
    </Space>
  )
}
export default PlyrTrack
