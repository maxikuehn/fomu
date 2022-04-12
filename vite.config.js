import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { getThemeVariables } from "antd/dist/theme"
import vitePluginImp from "vite-plugin-imp"

// const { getThemeVariables } = require("antd/dist/theme")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: "antd",
          libDirectory: "es",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      // Add _all_ external dependencies here
      // external: ["lodash/default"],
      // output: {
      //   globals: {
      //     lodash: "lodash/default",
      //   },
      // },
    },
  },
  resolve: {
    alias: [
      // { find: '@', replacement: path.resolve(__dirname, 'src') },
      // fix less import by: @import ~
      // https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
      { find: /^~/, replacement: "" },
    ],
  },
  // server: { open: true },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      less: {
        modifyVars: {
          ...getThemeVariables({
            dark: true,
            // compact: true,
          }),
          // "@primary-color": "#285e94",
          // "@text-color": "#0F0",
        },
        javascriptEnabled: true,
      },
    },
  },
})
