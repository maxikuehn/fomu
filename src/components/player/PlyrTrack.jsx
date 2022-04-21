import { Image, Space, Typography } from "antd"
import heartInactive from "./../../assets/icons/heart-64.png"
import heartActive from "./../../assets/icons/heart-64-active.png"

const PlyrTrack = ({ track }) => {
  if (!track) {
    return <div />
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
          <a
            href={track.uri}
            className="cursor-pointer text-inherit font-semibold hover:text-primary-300 hover:underline"
          >
            {name}
          </a>
          <div>
            {artists
              .map((a, i) => (
                <a
                  href={a.uri}
                  className="cursor-pointer text-inherit hover:text-primary-300 hover:underline"
                  key={i}
                >
                  {a.name}
                </a>
              ))
              .reduce((prev, curr) => [prev, ", ", curr])}
          </div>
        </Space>
        {/* <Image height={35} width={35} src={heartInactive} preview={false} /> */}
      </div>
    </Space>
  )
}
export default PlyrTrack
