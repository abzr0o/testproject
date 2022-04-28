import exsession from "express-session"
import { redisClient } from "../db"
import redisStore from "./redisstore"

const session = exsession({
  store: new redisStore({ client: redisClient }),
  secret: process.env.SESSION,
  saveUninitialized: false,
  resave: false,
  name: "sessionid",
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: false, secure: false },
})

export default session
