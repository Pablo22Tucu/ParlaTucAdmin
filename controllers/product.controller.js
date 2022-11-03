import { matchedData } from 'express-validator'
import Product from '../models/product.model.js'
import handleHttpError from '../utils/handleError.js'
import { uploadImage } from '../utils/cloudinary.js'
import fs from 'fs-extra'



//matchData para filtrar los datos que llegan a la base de datos


//consultar una publicacion por id
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({
      message: 'Product does not exist'
    })
    return res.json(product)
  } catch (error) {
    handleHttpError(res, "error get items")
  }
}

//consultar todas las publicaciones
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    handleHttpError(res, "error get items")
  }
}

//crear publicaciones
export const createProduct = async (req, res) => {
  try {
    const bodyClean = matchedData(req)
    const { name, description, price } = bodyClean

    const product = new Product({
      name,
      description,
      price,
    })

    if (req.files?.imagen) {      
      const result = await uploadImage(req.files.imagen.tempFilePath)
      product.imagen = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      await fs.unlink(req.files.imagen.tempFilePath)
    }
    await product.save()
    res.json(product)
  } catch (error) {
    handleHttpError(res, "Error al crear Publicacion")
  }

}

//editar una publicacion por id
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const productUpdated = await
      Product.findByIdAndUpdate(id, req.body, {
        new: true
      })
    return res.json(productUpdated)
  } catch (error) {
    handleHttpError(res, "Error_UPDATED_ITEM")
  }
}

//eliminar publicaciones a traves del id
//metodo soft delete (cambia estado)
export const deleteProduct = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req
    const product = await Product.deleteById({ _id: id })
    if (!product) return res.status(404).json({
      message: 'Product does not exist'
    })
    return res.json(product)
  } catch (e) {
    handleHttpError(res, "Error_DELETE_ITEM")
  }

} 
