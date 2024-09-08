
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./router/prouductRoutes')

const vendorRoutes = require('./router/vendorRoutes');
const firmRoutes = require('./router/firmRoutes');
const path = require('path')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

mongoose.connect(process.env.MONGO_URL).then(()=>{
    
    console.log("database is conneted successfully")
}).catch((error)=>{
    console.log(error)
})      
app.use(bodyParser.json())
app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))
app.use('/',(req,res)=>{
    res.send('<h1>Welcome to suby</h1>')
})
app.listen(PORT,(req,res)=>{
    console.log(`this server is running at ${PORT}`)
})