import { Button, Image } from "antd"
import { logout } from "../recoil"

const SpotifyPremiumHandler = () => {
  return (
    <div className="absolute z-50 flex h-full w-full flex-col items-center justify-center bg-background">
      <div className="flex flex-col space-y-5 p-4">
        <div className="flex items-start">
          <Image
            src="src\assets\images\Spotify_Logo_RGB_Green.png"
            preview={false}
            height={55}
            className="mt-[7px] hover:cursor-pointer"
            onClick={() => window.open("https://www.spotify.com/premium")}
          />
          <div className="ml-2 font-metro text-4xl font-medium leading-loose ">
            Premium notwendig
          </div>
        </div>
        <div className="w-96 text-lg">
          Leider ist ein Spotify Premium Account notwendig um die Funktionen von{" "}
          <span className="whitespace-nowrap font-metro font-medium tracking-[0.25em] ">
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
