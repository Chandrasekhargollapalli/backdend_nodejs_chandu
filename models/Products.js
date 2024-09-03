    const mongoose = require('mongoose')

    const productSchema = new mongoose.Schema({
        productName:{
            type:String,
            required:true
        },
        area:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        category:{
            type:[
                {
                    type:String,
                    enum:['veg','non-veg']
                }
            ]
        },
        image:{
            type:String,
            
        },
        bestseller:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        firm:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }]
    })

    const product =  mongoose.model('Product',productSchema)
    module.exports =  product