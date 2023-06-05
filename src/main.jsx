import "./index.css"
import React, { lazy, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RecoilRoot } from "recoil"
import RecoilNexus from "recoil-nexus"
import LoadingPage from "./views/LoadingPage"
import { ConfigProvider, theme, App as AntdApp } from "antd"
import de_DE from "antd/locale/de_DE"
import SiteNotFound from "./views/SiteNotFound"

const App = lazy(() => import("./App"))

const container = document.getElementById("app")
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <ConfigProvider
      locale={de_DE}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#156DC4",
        }
      }}
    >
      <AntdApp>
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
      </AntdApp>
    </ConfigProvider>
  </React.StrictMode>
)
