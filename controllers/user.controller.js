import Joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const saltRounds = 10
const jwtSecret = process.env.JWT_SECRET || 'mysecretkey'

const UserController = {
  async createUser (req, res) {
    try {
      // Validating user data
      const { body } = req
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
      })
      const { error } = schema.validate(body)
      if (error) {
        return res.status(400).json({ error: error.details[0].message })
      }
      // Checking if the user already exists
      const userExists = await User.findOne({ email: req.body.email })
      if (userExists) {
        return res.status(400).send({ error: 'User already exists' })
      }
      // Encrypting user password
      const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
      // Creating the new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash
      })
      const result = await User.create(newUser)
      // Generating JWT token
      const token = jwt.sign({ id: newUser._id }, jwtSecret)

      // Returning the user data and JWT token
      const { password, ...rest } = result._doc
      return res.status(201).json({ user: rest, token })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },

  async authenticateUser (req, res) {
    try {
      // Validating user data
      const { body } = req
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      })
      const { error } = schema.validate(body)
      if (error) {
        return res.status(400).send({ error: error.details[0].message })
      }

      // Checking if the user exists
      const result = await User.findOne({ email: body.email }).select('+password')
      if (!result) {
        return res.status(401).send({ error: 'Invalid credentials' })
      }

      // Comparing user password with password stored in database
      const passwordMatch = await bcrypt.compare(body.password, result.password)
      if (!passwordMatch) {
        return res.status(401).send({ error: 'Invalid credentials' })
      }

      // Generating JWT token
      const token = jwt.sign({ id: result._id }, jwtSecret)

      // Returning the user data and JWT token
      const { password, ...rest } = result._doc
      return res.status(200).send({ user: rest, token })
    } catch (err) {
      return res.status(500).send({ error: 'Server error' })
    }
  }
}

export default UserController
