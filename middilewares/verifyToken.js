const Vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config() 
const Secret = process.env.MYNAME
const verifyToken = async(req,res,next)=>{
    const token = req.headers.token
    if(!token){
    return  res.status(401).json({error:"token is required"})
    }
    try{
const decoded = jwt.verify(token,Secret)
// console.log("Decoded token:", decoded)
const vendor = await Vendor.findById(decoded.vendorId)
// console.log("vendor found", vendor)
if(!vendor){
    return res.status(404).json({message:'vendor is not found'})
}
req.vendorId = vendor._id
next()
    }catch(error){
        console.log(error)
        res.status(500).json({mesage:'invalid token'})
    }
}

module.exports = verifyToken