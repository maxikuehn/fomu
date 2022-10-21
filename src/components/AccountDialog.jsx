import { Button, Divider, Modal, Typography } from "antd"
import React, { useState, useEffect, memo } from "react"
import { useNotification } from "../Hooks/Notification"

const { Text } = Typography
const dev = import.meta.env.DEV

const AccountDialog = ({ open, handleClose: propsHandleClose }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  useEffect(() => {}, [])

  const handleClose = () => {
    setShowDeleteButton(false)
    propsHandleClose()
  }

  const gehtnochnicht = () => {
    useNotification({
      content: "Sorry, das geht noch nicht :))))))",
      type: "error",
      duration: 5,
    })
  }

  return (
    <Modal
      title="Account Einstellungen"
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <div className="flex flex-col space-y-12">
        {dev && (
          <>
            <div className="flex flex-col space-y-2">
              <Text className="text-2xl font-semibold">
                Weekly deaktivieren
              </Text>
              <Text>
                Es werden keine Playlists mehr automatisch gespeichert.
              </Text>
              <Button type="primary" onClick={gehtnochnicht}>
                Weekly deaktivieren
              </Button>
            </div>
            <Divider />
          </>
        )}

        <div className="flex flex-col space-y-2">
          <Text className="text-2xl font-semibold">
            Verbindung zu Spotify trennen
          </Text>
          <Text>
            Die Verbindung zu dieser App kann nur bei den Spotify Einstellungen
            getrennt werden.
          </Text>
          <Button
            type="primary"
            onClick={() =>
              window.open("https://www.spotify.com/us/account/apps/", "_blank")
            }
          >
            Verbindung trennen
          </Button>
        </div>
        <Divider />
        <div className="flex flex-col space-y-2">
          <Text className="text-2xl font-semibold">Account löschen</Text>
          <Text>
            Damit werden <span className="underline">alle</span>{" "}
            personenbezogenen Daten gelöscht.
          </Text>
          <Button
            type="primary"
            danger
            disabled={showDeleteButton}
            onClick={() => setShowDeleteButton(true)}
          >
            Account löschen
          </Button>
          {showDeleteButton && (
            <Button type="primary" danger onClick={gehtnochnicht}>
              Löschen bestätigen
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default memo(AccountDialog, (p, n) => p.open === n.open)
