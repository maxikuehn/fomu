import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RecoilRoot } from "recoil"
import RecoilNexus from "recoil-nexus"
import "./index.css"
import "antd/dist/antd.dark.css"
import App from "./App"
import LoadingPage from "./views/LoadingPage"
import { ConfigProvider } from "antd"
import de_DE from "antd/lib/locale/de_DE"

if (import.meta.env.DEV) console.log = () => {}

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={de_DE}>
      <RecoilRoot>
        <RecoilNexus />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="callback" element={<LoadingPage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
