var express = require('express');
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/productsImages',
    filename: (_req,file,cb)=>{
        const extension = file.originalname.slice(
            file.originalname.lastIndexOf(".")
        )
        console.log(extension)
        cb(null, new Date().valueOf()+extension)
    }
})
    const upload = multer({storage}).single("avatar")

const controller = require('../controller/productController');

//localhost:3000/products
router.get('/', controller.viewAllProducts);

router.get('/:id_product', controller.viewOneProduct)

//localhost:3000/products/editProduct/:id_product
router.get('/editProduct/:id_product', controller.editProduct);

//localhost:3000/products/deleteProduct/:id_product
router.get('/deleteProduct/:id_product', controller.deleteProduct);

//localhost:3000/products/saveProduct/:id_seller
router.post('/saveProduct/:id_seller', upload, controller.saveProduct);

//localhost:3000/products/updateProduct/:id_product
router.post('/updateProduct/:id_product', controller.updateProduct);

module.exports = router;