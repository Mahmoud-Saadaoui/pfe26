import express from "express"
import authRouter from "./authRoutes.js"
import userRouter from "./userRoutes.js"
import interventionRouter from "./interventionRoutes.js"

const rootRouter = express.Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/users', userRouter)
rootRouter.use('/interventions', interventionRouter)

export default rootRouter