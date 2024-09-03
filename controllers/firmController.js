const Firm = require('../models/Firm')
const Vendor = require('../models/Vendor')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')// destination folder where upload images are stored
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname);//generating unique filename
    }
})

const upload =  multer({storage:storage})

const addFirm = async(req,res)=>{
   try{
    const {firmname,area,category,region,offer} = req.body

    const image = req.file? req.file.filename : undefined
     const vendor =  await Vendor.findById(req.vendorId)
   
     if(!vendor){
       return res.status(404).json({message:'Vendor not found'})
     }
 const firm = new Firm({
     firmname,
     area,
     category,
     region,
     offer,
     image,
     vendor:vendor._id
 })
  const savedFirm = await firm.save()

  vendor.Firm.push(savedFirm)

  await vendor.save()

 res.status(202).json({message:'firm added successfully'})
   }catch(error){
console.log(error)
res.status(500).json({message:"internal server error"})
   }
}
const deleteFirmById = async(req,res)=>{
    try{
            const firmId = req.params.firmId;
            const deletedFirm = await Firm.findByIdAndDelete(firmId)
            if(!deletedFirm){
                return res.status(404).json({error:'no Firm found'})
            }
    }catch(error){
        res.status(500).json({error:'internal server eror'})
    }
}

module.exports = {addFirm: [upload.single('image'),addFirm],deleteFirmById}