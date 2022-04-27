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
        "spotify-green": "#1fdf64",
      },
      transitionProperty: {
        dimension: "width, height",
        margin: "margin",
        allBorderWidth: "border-width",
      },
    },
  },
  plugins: [],
}
