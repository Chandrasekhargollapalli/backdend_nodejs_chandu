const Product = require('../models/Products')
const multer = require('multer')
// const Firm = require('../models/Firm')
const Firm = require('../models/Firm')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')// destination folder where upload images are stored
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname));//generating unique filename
    }
})

const upload =  multer({storage:storage})
const addProduct = async (req, res) => {
    try {
      const { productName, area, price, category, bestseller, description } = req.body;
      const image = req.file ? req.file.filename : undefined;
      const firmId = req.params.firmId;
  
      // Find the firm by ID
      const firm = await Firm.findById(firmId);
  
      if (!firm) {
        return res.status(401).json({ error: 'Firm not found' });
      }
  
      // Create a new product
      const product = new Product({
        productName,
        area,
        price,
        category,
        bestseller,
        description,
        image,
        firm: firmId // Associate the product with the firm
      });
  
      // Save the new product to the database
      const savedProduct = await product.save();
  
      // Add the product ID to the firm's products array
      firm.products.push(savedProduct._id);
  
      // Save the updated firm to the database
      await firm.save();
  
      // Respond with the saved product
      res.status(200).json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(501).json({ error: 'Internal server error' });
    }
  };
  
const getProductsByFirm = async(req,res)=>{
    try{
        const firmId = req.params.firmId;
      
        const firm = await Firm.findById(firmId)
        
    
        if(!firm){
return res.status(404).json({error:'no firm found'})
        }
        const restaurantName = firm.firmname;
        const products = await Product.find({firm:firmId})
   
res.status(200).json({restaurantName,products})
    }catch(error){
        console.log(error)
        res.status(501).json({error:'internalserver error'})
    }
}

const deleteProductById = async(req,res)=>{
    try{
            const productId = req.params.productId;
            const deletedProduct = await Product.findByIdAndDelete(productId)
            if(!deletedProduct){
                return res.status(404).json({error:'no product found'})
            }
    }catch(error){
        res.status(500).json({error:'internal server eror'})
    }
}

module.exports ={addProduct:[upload.single('image'),addProduct],getProductsByFirm,deleteProductById}