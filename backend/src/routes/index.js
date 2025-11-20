import express from "express"
import authRouter from "./authRoutes.js"
import userRouter from "./userRoutes.js"

const rootRouter = express.Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/users', userRouter)

export default rootRouter