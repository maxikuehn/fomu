//var url = require("url")
const express = require("express")
const cors = require("cors")
const path = require("path")
const router = require("./auth")

const app = express()
const port = 3000

console.clear()

app.use(express.static(path.join(__dirname, "..", "dist")))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use("/api", router)

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"))
})

app.listen(port, () => {
  console.log("server started on port", port)
})
