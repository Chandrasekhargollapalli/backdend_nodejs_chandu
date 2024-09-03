const express = require('express')
const vendorregistration = require('../controllers/VendorController')

const router = express.Router()

router.post('/registration',vendorregistration.vendorRegister)
router.post('/login',vendorregistration.vendorLogin)
router.get('/all-vendors',vendorregistration.getAllvendors)
router.get('/single-vendor/:id',vendorregistration.getVendorbyId)
module.exports =  router