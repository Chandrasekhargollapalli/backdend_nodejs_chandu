const express =  require('express')
const productcontroller = require('../controllers/productController')
const router = express.Router()
router.post('/add-product/:firmId',productcontroller.addProduct)
router.get('/:firmId/products',productcontroller.getProductsByFirm)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName =  req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName))
})
router.delete('/:productId',productcontroller.deleteProductById)

module.exports = router

