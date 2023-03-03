import mongoose from 'mongoose'
import app from './app.js'
import * as dotenv from 'dotenv'

const PORT = process.env.PORT || 4001

dotenv.config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, console.log('Server running on port ' + PORT))
  })
  .catch((err) => {
    console.log(err)
  })
