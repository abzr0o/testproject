import { Router } from "express"
import { postGet, PostPost } from "../../controller"

const router = Router()

router.get("/post", postGet)
router.post("/post", PostPost)

export default router
