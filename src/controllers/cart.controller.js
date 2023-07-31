
import * as service from '../services/cart.services.js';



export const getAllController=async(req,res)=>{
    try {
        const cartAll=await service.getAllService()
        res.status(200).json({cartAll})
    } catch (error) {
        console.log(error)
    }
}
export const getByidController=async(req,res)=>{
    try {
        const {id}=req.params;
        const cartId=await service.getCartByIdService(id)
        if(!cartId)return res.status(404).json({status:"Error",message:"Product not found"})

        res.status(200).json(cartId)
    } catch (error) {
        
    }
}

export const createController=async(req,res)=>{
    try {
        const newCart=await service.createCartService({})
        if(!newCart)return res.status(404).json({status:"error",message:"Error al crear cart"})
        return  res.status(201).json({newCart})
    } catch (error) {
        
    }
}

export const productAddCartController=async(req,res)=>{
    try {
        const {idProduct,idCart}=req.params;
        // console.log("idCart: "+idCart)
        // console.log("idProduct: "+idProduct)
        const response= await service.addProductCartService(idCart,idProduct);  
        console.log(response)
        if(!response)return res.status(404).json({status:"error",message:"ID product o ID cart not found",idProduct,idCart})
        
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
    }
}
export const updateQuantityCart=async(req,res)=>{
    try {
        const {cid,pid}=req.params
        const {quantity}=req.body
        const response=await service.updateQuantityCart(quantity,cid,pid);
        if(isNaN(quantity)){
            return res.status(404).json({status:"error",message:"quantity not a number"})
        }
        if(!response)return res.status(404).json({status:"error",message:"ID cart/product not found"})

        res.status(200).json(response)
        
    } catch (error) {
        console.log(error);
    }
}
export const deleteProductFromCart=async(req,res)=>{
    try {
        const {cid,pid}=req.params;
        const response=await service.deleteProductFromCart(cid,pid)
        if (!response) res.status(404).json({message:"ID product o ID cart not found"})
        else res.status(200).json(response)
    } catch (error) {
        console.log(error);
      // res.status(500).json({message:"An error occurred on the server"})
    }
}

export const deleteAllProductToCart=async(req,res)=>{
    try {
        const {cid}=req.params;
        const response=await service.deleteAllProductToCart(cid);
        if(!response)return res.status(404).json({status:"error",message:"ID not found"})
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
    }
}
export const updateCart=async(req,res)=>{
    try {
        const {cid}=req.params;
        const array=req.body;
        
        if(!Array.isArray(array)){
            return res.status(404).json({status:"error",message:"Debe ser un array"})
        }
        for (const element of array) {
            let key = Object.keys(element);
            if (key[0] !== "id" || key[1] !== "quantity") {
                return res.status(404).json({ status: "error", message: "formato incorrecto" });
            }
        }
        const response=await service.updateCart(array,cid);
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
    }
}