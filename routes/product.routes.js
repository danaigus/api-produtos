import express from 'express'
import * as control from '../controllers/product.controller.js'
const router = express.Router()

router.post('/products', control.createProduct)
router.get('/products', control.getProducts)
router.get('/products/:id', control.getProduct)
router.patch('/products/:id', control.updateProduct)
router.delete('/products/:id', control.deleteProduct)

export default router
