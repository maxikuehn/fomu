module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
        "spotify-green": "#1fdf64",
      },
      transitionProperty: {
        dimension: "width, height",
        margin: "margin",
        allBorderWidth: "border-width",
      },
      animation: {
        "music-playing": "musicicon 1500ms ease-in-out infinite alternate",
      },
      keyframes: {
        musicicon: {
          "0%": { height: "4px" },
          "100%": { height: "15px" },
        },
      },
    },
  },
  plugins: [],
}
