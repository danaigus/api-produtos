import mongoose from 'mongoose'
const { Schema } = mongoose

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      min: 0,
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Product', productSchema)
