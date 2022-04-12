const express = require("express")
const path = require("path")
const app = express() // create express app

app.use(express.static(path.join(__dirname, "..", "dist"))) // set static folder
app.use(express.static("public"))

// start express server on port 3000
app.listen(3000, () => {
  console.log("server started on port 3000")
})
