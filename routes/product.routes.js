import express from 'express'
import ProductController from '../controllers/product.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
const router = express.Router()

router.post('/products', authMiddleware, ProductController.createProduct)
router.get('/products', ProductController.getProducts)
router.get('/products/:id', ProductController.getProduct)
router.patch('/products/:id', authMiddleware, ProductController.updateProduct)
router.delete('/products/:id', authMiddleware, ProductController.deleteProduct)

export default router
