import { Divider, Image, Space, Typography } from "antd"

const { Text } = Typography

const PlyrTrack = ({ track }) => {
  const { name, artists, album } = track

  return (
    <Space direction="vertical" className="w-min">
      <Image
        src={album.images[0].url}
        preview={false}
        width={600}
        height={600}
      />
      <Space direction="vertical" size={0}>
        <Text strong>{name}</Text>
        <Text>{artists.map((a) => a.name).join(", ")}</Text>
      </Space>
    </Space>
  )
}
export default PlyrTrack
