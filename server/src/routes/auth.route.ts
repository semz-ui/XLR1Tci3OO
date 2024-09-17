import express from "express"
import { register, login, getUser } from "../controllers/auth.controller"
import { protectRoute } from "../middlewares/protectRoute"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me", protectRoute, getUser)

export default router