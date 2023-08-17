import { Modal, Typography } from "antd"

const { Text, Title, Paragraph } = Typography

const InformationDialog = ({ open, handleClose }) => {
  return (
    <Modal
      title="Über diese App"
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <div className="leading- whitespace-pre-line">
        <div>
          <Title level={1}>F O M U</Title>the fear of missing music
        </div>
        <br />
        <p>
          Sämtliche Daten, welche in dieser Web-App angezeigt werden, werden von
          der{" "}
          <a
            href="https://developer.spotify.com/documentation/web-api/reference/#/"
            target={"_blank"}
            rel="noreferrer"
          >
            Spotify Web API
          </a>{" "}
          zur Verfügung gestellt. Die Rechte liegen bei Spotify und den
          jeweiligen Künstlern. Diese App ist nicht mit Spotify in Verbindung zu
          setzen. Die App ist nur für den privaten Gebrauch gedacht. Die App ist
          nicht kommerziell.
        </p>
        <br />
        <div>
          <span>Angaben gemäß § 5 TMG</span>
          <Title level={1}>Impressum</Title>
          <strong className="text-base">Seiteninhaber:</strong> Maximilian Kühn
          <br />
          <strong className="text-base">E-Mail: </strong>
          <a href="mailto:mail@fomu.app">mail@fomu.app</a>
          <br/>
          <strong className="text-base">Adresse:</strong> Sternbergstr. 7, 76131 Karlsruhe
        </div>
      </div>
    </Modal>
  )
}

export default InformationDialog
