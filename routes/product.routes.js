import express from 'express'
import * as control from '../controllers/product.controller.js'
const router = express.Router()

router.post('/products', control.createProduct)

export default router
