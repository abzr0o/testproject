import express from "express"
import cookieparser from "cookie-parser"

import { pool } from "./db"
import { notAuth } from "./router"
import session from "./sessions"

const PORT = process.env.PORT || 2000

pool.connect((err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log("connected to db")
})

const app = express()
app.disable("x-powered-by")
app.use(express.json())
app.use(cookieparser())
app.use(session)
app.use("/v1", notAuth)

app.listen(PORT, () => {
  console.log(`up and running at port ${PORT}`)
})
