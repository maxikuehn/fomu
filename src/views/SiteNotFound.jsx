import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

const SiteNotFound = () => {
  let navigate = useNavigate()
  return (
    <div className="w-screen h-screen bg-background flex items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Huch! Wie bist du denn hier gelandet?"
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Schnell Zurück
          </Button>
        }
      />
    </div>
  )
}
export default SiteNotFound
