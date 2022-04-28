import express from "express"

import login from "./login"
import register from "./register"
const notAuth = express.Router()

notAuth.use("/api", login)
notAuth.use("/api", register)

export { notAuth }
