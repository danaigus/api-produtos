import express from 'express'
import ProductRoutes from './routes/product.routes.js'

const app = express()

app.use(express.json())

/* This is the root route. It is used to check if the server is running. */
app.get('/', (_req, res) => {
  res.status(200).json({ alive: 'True' })
})

app.use('/api', ProductRoutes)

export default app
