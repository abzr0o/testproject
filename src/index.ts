import express from "express"
import cookieparser from "cookie-parser"
import cors from "cors"
import { pool } from "./db"
import { auth, notAuth } from "./router"

import { authentication } from "./controller"

const PORT = process.env.PORT || 2000

pool.connect((err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log("connected to db")
})

const app = express()
app.use(cors({ origin: "*" }))
app.disable("x-powered-by")
app.use(express.json())
app.use(cookieparser())

app.use("/v1", notAuth)
app.use(authentication)
app.use("/v2", auth)

app.listen(PORT, () => {
  console.log(`up and running at port ${PORT}`)
})
