import { Modal, Select, Typography } from "antd"
import React, { useState, useEffect, memo } from "react"
import { useRecoilValue } from "recoil"
import api from "../../api"
import { useNotification } from "../../Hooks/Notification"
import {
  currentUserOwnedPlaylistState,
  currentUserPlaylistsState,
} from "../../recoil"
const { OptGroup } = Select
const { Text } = Typography

const priorityTitles = [
  ["Dein Mix der Woche", "Discover Weekly", "Descrubimeiento semanal"],
  ["Release Radar"],
]

const WeeklyDialog = ({ open, handleClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const playlists = useRecoilValue(currentUserPlaylistsState)
  const userPlaylists = useRecoilValue(currentUserOwnedPlaylistState)
  const [playlistRecommended, setPlaylistRecommended] = useState([])
  const [inputSelect, setInputSelect] = useState([])
  const [outputSelect, setOutputSelect] = useState("")

  useEffect(() => {
    if (playlists.length === 0) return
    setPlaylistRecommended(() => {
      const _recommended = []
      priorityTitles.forEach((title) => {
        const playlist = playlists.find(
          (p) => title.includes(p.name) && p.owner.id === "spotify"
        )
        if (playlist !== undefined) _recommended.push(playlist)
      })
      setInputSelect([_recommended[0]?.id ?? playlists[0]?.id])
      return _recommended
    })
  }, [])

  const handleOk = async () => {
    if (inputSelect.length === 0 || outputSelect === "") return

    setConfirmLoading(true)
    try {
      await api.weekly.register({ inputSelect, outputSelect })
      handleClose()
      useNotification({ content: "Für weekly registriert" })
    } catch (_) {}
    setConfirmLoading(false)
  }

  const Option = ({ id, name, owner }) => (
    <Select.Option value={id} key={id} label={name}>
      <div className=" flex justify-between absolute w-[calc(100%_-_55px)]">
        <Text>{name}</Text>
        <Text keyboard>{owner.display_name}</Text>
      </div>
    </Select.Option>
  )

  return (
    <Modal
      title="Mix der Woche"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleClose}
      okButtonProps={{
        disabled: inputSelect.length === 0 || outputSelect === "",
      }}
    >
      <Text>
        Wähle alle Playlists aus, die wöchentlich gespeichert werden sollen
      </Text>
      <Select
        className="w-full"
        value={inputSelect}
        onChange={setInputSelect}
        mode="multiple"
        optionLabelProp="label"
      >
        {playlistRecommended.length > 0 ? (
          <>
            <OptGroup label="empfohlen">
              {playlistRecommended.map(Option)}
            </OptGroup>
            <OptGroup label="weitere">
              {playlists
                .filter((playlist) => !playlistRecommended.includes(playlist))
                .map(Option)}
            </OptGroup>
          </>
        ) : (
          playlists.map(Option)
        )}
      </Select>
      <div className="h-6" />
      <Text level={5}>Neue Tracks werden hier gespeichert</Text>
      <Select
        className="w-full"
        value={outputSelect}
        onChange={setOutputSelect}
        optionLabelProp="label"
      >
        {userPlaylists.map(Option)}
      </Select>
    </Modal>
  )
}
export default memo(WeeklyDialog, (p, n) => p.open === n.open)
