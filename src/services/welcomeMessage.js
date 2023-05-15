import { getVersion } from "./AppVersion"

const asciistring = `
███████╗ ██████╗ ███╗   ███╗██╗   ██╗
██╔════╝██╔═══██╗████╗ ████║██║   ██║
█████╗  ██║   ██║██╔████╔██║██║   ██║
██╔══╝  ██║   ██║██║╚██╔╝██║██║   ██║
██║     ╚██████╔╝██║ ╚═╝ ██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝     ╚═╝ ╚═════╝`

export const printWelcomeMessage = () => {
  const version = getVersion()
  console.log(`%c${asciistring}\t\t${version}\n`, "color:#156dc4")
}
