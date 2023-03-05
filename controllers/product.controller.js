import Joi from 'joi'
import Product from '../models/product.model.js'
import Utils from '../utils/utils.js'

const ProductController = {
  // Function to create a new product
  async createProduct (req, res) {
    try {
      // Validating product data
      const { body } = req
      const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().greater(0).required()
      })
      const { error } = schema.validate(body)
      if (error) {
        return res.status(400).json({ error: error.details[0].message })
      }
      // Create new product
      const product = await Product.create(body)
      res.status(201).json({ product })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // Function to list products
  async getProducts (req, res) {
    try {
      const { page = 1, limit = 10, sort = 'name', order = 'asc', search = '' } = req.query
      // Defining sort options based on request query
      const sortOptions = {
        name: order === 'desc' ? '-name' : 'name',
        price: order === 'desc' ? '-price' : 'price'
      }
      // Defining pagination options based on request query
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: sortOptions[sort]
      }
      // Creating a regular expression to filter by search term
      const searchRegex = new RegExp(Utils.convertSearchContent(search), 'i')
      const filter = {
        $or: [
          { name: { $regex: searchRegex } },
          { description: { $regex: searchRegex } }
        ]
      }
      // Querying for products that match filter and pagination options
      const products = await Product.paginate(filter, options)
      // Returning products as JSON response
      res.status(200).json({ products })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // Function to recover a existing product
  async getProduct (req, res) {
    try {
      const { id } = req.params
      const product = await Product.findById(id)
      if (!product) {
        return res.status(404).send({ error: 'Product not found' })
      }
      res.status(200).json({ product })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // Function to update a existing product
  async updateProduct (req, res) {
    try {
      const { id } = req.params
      const { body } = req
      const schema = Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        price: Joi.number().greater(0)
      }).min(1)
      const { error } = schema.validate(body)
      if (error) {
        return res.status(400).json({ error: error.details[0].message })
      }
      const product = await Product.findByIdAndUpdate(id, body, { new: true })
      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }
      res.status(200).json({ product })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // Function to delete a existing product
  async deleteProduct (req, res) {
    try {
      const { id } = req.params
      const product = await Product.findByIdAndDelete(id)
      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }
      res.status(200).json({ product })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

export default ProductController
