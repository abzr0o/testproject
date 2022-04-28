import pg, { PoolConfig } from "pg"
import dotenv from "dotenv"

dotenv.config()
const env = process.env
const poolConfig = {
  user: env.DB_USER,
  host: env.DB_ENGPOINT,
  port: <number | string>env.DB_PORT,
  password: env.DB_PASSWORD,
  database: env.DB,
} as PoolConfig
const pool = new pg.Pool(poolConfig)

export default pool
