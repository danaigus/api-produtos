import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
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
productSchema.plugin(mongoosePaginate)

const Product = mongoose.model('Product', productSchema)

export default Product
