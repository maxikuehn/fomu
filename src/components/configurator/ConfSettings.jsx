import { Card, Checkbox, Form, Select } from "antd"
import Text from "antd/lib/typography/Text"

const ConfSettings = ({ ownedPlaylists }) => {
  return (
    <div className="p-2 m-8 w-80 border-4 border-primary-active rounded-lg flex flex-col gap-2">
      <Text>Zusammenführen in:</Text>
      <Select className="w-40" defaultValue={null}>
        <Select.Option key="null" value={null}>
          -
        </Select.Option>
        <Select.Option key="new" value="createNew">
          ...neue Playlist
        </Select.Option>
        {ownedPlaylists.map((p) => (
          <Select.Option key={p.id} value={p.id}>
            {p.name}
          </Select.Option>
        ))}
      </Select>
      <Checkbox>Tracks löschen</Checkbox>
    </div>
  )
}
export default ConfSettings
