import { Router } from 'express'
import { validatorCreate, validatorGet } from "../validators/product.validator.js"
//import customHeader from "../middleware/customHeader.js"
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'
import fileUpload from 'express-fileupload'

const router = Router()

router.get('/products/:id', validatorGet, getProduct)

router.get('/products', getProducts)

router.post('/products', fileUpload({ useTempFiles: true, tempFileDir: './uploads' }), validatorCreate, createProduct)
                                 
router.put('/products/:id', validatorCreate, validatorGet, updateProduct)

router.delete('/products/:id', validatorGet, deleteProduct)

export default router
