import pg from "pg"

const pool = new pg.Pool({
  user: "mohammed",
  password: "QWsazxc12e",
  host: "database-1.cqryzo8l8ul8.eu-west-2.rds.amazonaws.com",
  port: 6059,
  database: "myDataBase",
})

export default pool
