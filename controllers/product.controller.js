import Product from '../models/product.model.js'

export async function createProduct (req, res) {
  try {
    const result = await Product.create(req.body)
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
}

export async function getProducts (req, res) {
  try {
    const result = await Product.find()
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
}

export async function getProduct (req, res) {
  try {
    const result = await Product.findById(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
}

export async function updateProduct (req, res) {
  try {
    const result = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
}

export async function deleteProduct (req, res) {
  try {
    const result = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
}
