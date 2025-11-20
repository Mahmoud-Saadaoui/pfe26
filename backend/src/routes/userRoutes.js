import express from 'express'
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const userRouter = express.Router()


userRouter.get('/', authMiddleware, getAllUsers)
userRouter.get('/:id', authMiddleware, getUserById)
userRouter.put('/:id', authMiddleware, updateUser)
userRouter.delete('/:id', authMiddleware, deleteUser)

export default userRouter
