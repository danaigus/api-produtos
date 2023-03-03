import Product from '../models/product.model.js'

export async function createProduct (req, res) {
  try {
    const result = await Product.create(req.body)
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
}
