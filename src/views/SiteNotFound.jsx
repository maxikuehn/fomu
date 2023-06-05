import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

const SiteNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
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
