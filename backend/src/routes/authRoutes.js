import express from "express"
import { register, login, logout, me } from "../controllers/authController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', authMiddleware, logout)
authRouter.get('/me', authMiddleware, me)


export default authRouter