import createconnect from "connect-redis"
import session from "express-session"

const redisStore = createconnect(session)

export default redisStore
