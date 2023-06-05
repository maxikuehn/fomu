import { Button } from "antd"
import { logout } from "../recoil"

const SpotifyPremiumHandler = () => {
  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center bg-background">
      <div className="flex flex-col p-4">
        <div className="flex md:items-center items-start flex-col md:flex-row">
          <img
            src="src/assets/images/Spotify_Logo_RGB_Green.png"
            alt="Spotify Logo"
            className="cursor-pointer h-14 mb-1"
            onClick={() => window.open("https://www.spotify.com/premium")}
            onKeyDown={() => window.open("https://www.spotify.com/premium")}
          />
          <span className="ml-2 font-metro text-4xl font-medium leading-loose">
            Premium notwendig
          </span>
        </div>
        <div className="max-w-sm flex flex-col gap-4 justify-center">
          <div className="text-lg">
            Leider ist ein Spotify Premium Account notwendig um die Funktionen
            von{" "}
            <span className="whitespace-nowrap font-metro font-medium tracking-[0.3em]">
              {"FOMU"}
            </span>{" "}
            nutzen zu können. Bitte melde dich mit einem Spotify-Premium Account
            an.
          </div>
          <Button onClick={logout} type="default">
            Abmelden
          </Button>
        </div>
      </div>
    </div>
  )
}
export default SpotifyPremiumHandler
