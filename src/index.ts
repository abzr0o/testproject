import express from "express"
import { pool } from "./db"
const PORT = process.env.PORT || 2000
const app = express()

pool.connect((err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log("connected to db")
})
app.get("/", async (req, res) => {
  const query = await pool.query("SELECT id, name from users")
  console.log(process.env)
  res.send(query.rows)
})
app.listen(PORT, () => {
  console.log(`up and running at port ${PORT}`)
})
