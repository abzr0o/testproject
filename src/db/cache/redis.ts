import { createClient } from "redis"

const redisClient = createClient({
  url: "redis://redis.faxggz.ng.0001.euw2.cache.amazonaws.com:6379",
})

export default redisClient
