import { Button, Image } from "antd"
import { logout } from "../recoil"

const SpotifyPremiumHandler = () => {
  return (
    <div className="absolute h-full w-full bg-background z-50 flex flex-col justify-center items-center">
      <div className="p-4 flex flex-col space-y-5">
        <div className="flex items-start">
          <Image
            src="src\assets\images\Spotify_Logo_RGB_Green.png"
            preview={false}
            height={55}
            className="mt-[7px] hover:cursor-pointer"
            onClick={() => window.open("https://www.spotify.com/premium")}
          />
          <div className="ml-2 font-metro font-medium text-4xl leading-loose ">
            Premium notwendig
          </div>
        </div>
        <div className="w-96 text-lg">
          Leider ist ein Spotify Premium Account notwendig um die Funktionen von{" "}
          <span className="font-metro font-medium whitespace-nowrap tracking-[0.25em] ">
            {"FOMU"}
          </span>{" "}
          nutzen zu können. Bitte melde dich mit einem Premium Account an.
        </div>
        <div>
          <Button onClick={logout}>abmelden</Button>
        </div>
      </div>
      <div className="h-52" />
    </div>
  )
}
export default SpotifyPremiumHandler
