import mongoose from "mongoose"
import mongooseDelete from "mongoose-delete"


const productSchema = mongoose.Schema({

  name: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    default: 0
  },
  imagen: {
    public_id: String,
    secure_url: String,
  }
}, {
  timestamps: true
});

productSchema.plugin(mongooseDelete, {overrideMethods: "all"});
export default mongoose.model('Product', productSchema);