var express = require('express');
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/sellersImages',
    filename: (_req,file,cb)=>{
        const extension = file.originalname.slice(
            file.originalname.lastIndexOf(".")
        )
        console.log(extension)
        cb(null, new Date().valueOf()+ extension)
    }
})

    const upload = multer({storage}).single("avatar");


const controller = require('../controller/sellerController');

//localhost:3000
router.get('/', controller.viewHome);

router.get('/profile/:id_seller', controller.viewOneSeller)

//localhost:3000/register
router.get('/register', controller.viewForm);

router.get('/editSeller/:id_seller', controller.editSeller);

//localhost:3000/deleteSeller/id_seller
router.get('/deleteSeller/:id_seller', controller.deleteSeller);

//localhost:3000/saveSeller
router.post('/saveSeller', upload, controller.saveSeller);

router.post('/updateSeller/:id_seller', upload, controller.updateSeller);




module.exports = router;
