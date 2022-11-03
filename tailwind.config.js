const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        metro: ["Metropolis", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          0: "#156DC4",
          300: "#357CC4",
          400: "#285e94",
          500: "#18406E",
          600: "#123053",
          700: "#0E2642",
        },
        background: "#0d1117",
        borderGrey: "#434343",
        "spotify-green": "#1db954",
      },
      transitionProperty: {
        dimension: "width, height",
        margin: "margin",
        allBorderWidth: "border-width",
      },
      animation: {
        "music-playing": "musicicon 2000ms ease-in-out infinite alternate",
      },
      keyframes: {
        musicicon: {
          "0%": { height: "20%" },
          "100%": { height: "100%" },
        },
      },
    },
  },
  plugins: [],
}
