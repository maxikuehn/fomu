import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import vitePluginImp from "vite-plugin-imp"

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: "antd",
          libDirectory: "es",
          style: (name) => {
            if (name !== "theme") return `antd/es/${name}/style`
          },
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
        javascriptEnabled: true,
      },
    },
  },
})
