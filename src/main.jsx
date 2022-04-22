import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RecoilRoot } from "recoil"
import RecoilNexus from "recoil-nexus"
import "./index.css"
import "antd/dist/antd.dark.css"
import LoadingPage from "./views/LoadingPage"
import { ConfigProvider } from "antd"
import de_DE from "antd/lib/locale/de_DE"
import SiteNotFound from "./views/SiteNotFound"

const App = lazy(() => import("./App"))

if (import.meta.env.PROD) console.log = () => {}

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={de_DE}>
      <RecoilRoot>
        <RecoilNexus />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <App />
                </Suspense>
              }
            />
            <Route path="callback" element={<LoadingPage />} />
            <Route path="*" element={<SiteNotFound />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
