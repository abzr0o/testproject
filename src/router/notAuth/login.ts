import { Router } from "express"
import { LoginController } from "../../controller"

const router = Router()

router.post("/login", LoginController)

export default router
