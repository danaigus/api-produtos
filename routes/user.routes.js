import express from 'express'
import UserController from '../controllers/user.controller.js'
const router = express.Router()

router.post('/users/register', UserController.createUser)
router.post('/users/login', UserController.authenticateUser)

export default router
