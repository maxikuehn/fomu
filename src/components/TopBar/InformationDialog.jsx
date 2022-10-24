import { Modal, Typography } from "antd"

const { Text, Title, Paragraph } = Typography

const InformationDialog = ({ open, handleClose: handleClose }) => {
  return (
    <Modal
      title="Impressum"
      open={open}
      onCancel={handleClose}
      footer={null}
      // width={600}
    >
      <div className="flex flex-col space-y-2">
        <Text>Angaben gemäß § 5 TMG</Text>
        <br />
        <Title level={1}>Kontakt</Title>
        <Text>
          <strong className="text-base">Seiteninhaber:</strong> Maximilian Kühn
        </Text>
        <Text>
          <strong className="text-base">Adresse:</strong> Sternbergstraße 7,
          76131 Karlsruhe, Deutschland
        </Text>
        <Text>
          <strong className="text-base">E-Mail: </strong>
          <a href="mailto:fomu@maxikuehn.de">fomu@maxikuehn.de</a>
        </Text>
        <br />
        <Title level={1}>Externe Links</Title>
        <Text>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
          permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
          konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Links
          umgehend entfernen.
        </Text>
        <br />
        {/* <Title level={1}>Datenschutz</Title>
        <Text>
          Die Nutzung unserer Webseite ist in der Regel ohne Angabe
          personenbezogener Daten möglich. Soweit auf unseren Seiten
          personenbezogene Daten (beispielsweise Name, Anschrift oder
          eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
          auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
          Zustimmung nicht an Dritte weitergegeben. <br />
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei
          der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
          lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
          möglich. <br />
          Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
          Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
          angeforderter Werbung und Informationsmaterialien wird hiermit
          ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich
          ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung
          von Werbeinformationen, etwa durch Spam-Mails, vor.
        </Text> */}
      </div>
    </Modal>
  )
}

export default InformationDialog
