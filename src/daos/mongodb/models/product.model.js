import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2'

const productSchema=new mongoose.Schema({
    title: { type: String, required: true,index:true},
    description: { type: String },
    code:{type:String, required:true,index:true},
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category:{type:String, required:true,index:true},
    thumbnails:[{type:String,default:[] }]
    // const {title,description,code,price,stock,category,thumbnails}=req.body
})

productSchema.plugin(paginate)

export const productModel=mongoose.model('Products',productSchema)