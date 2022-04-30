import { Router } from "express"
import post from "./post"
const router = Router()

router.use("/api", post)

export default router
