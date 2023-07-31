import mongoose from "mongoose";

const collection="carts"
const cartSchema=new mongoose.Schema({
    products: [{
       id:{ type: mongoose.Schema.Types.ObjectId,ref:"Products"},
        quantity:Number,
        _id:false
    }
    
]
   
})
cartSchema.pre('find',function(){
    this.populate('products.id')
})

export const cartsModel=mongoose.model(collection,cartSchema)

