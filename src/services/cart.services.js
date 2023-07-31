import { response } from "express";
import CartsDaoMongoDB from "../daos/mongodb/cart.dao.js";
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";

const productDao=new ProductDaoMongoDB()
const cartDao=new CartsDaoMongoDB()
export const getAllService=async()=>{
    try {
        const response=await cartDao.getAll();
        return response;
    } catch (error) {
        console.log(error);
    }
    
}

export const createCartService=async()=>{
    try {
        const response=await cartDao.createCart({});
        if(!response)return false;
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getCartByIdService=async(id)=>{
    try {
        const response=await cartDao.getCartById(id)
        if(!response)return false;
        return response;
    } catch (error) {
        console.log(error)
    }
}
export const addProductCartService=async(idCart,idProduct)=>{
    try {
        const carts=await cartDao.getCartById(idCart);
        const products=await productDao.getProductById(idProduct)
        if(!carts || !products)return false;
        const response=await cartDao.addProductCart(idCart,idProduct)
        return response
    } catch (error) {
        console.log(error)
    }
}
export const updateQuantityCart=async(quantity,idCart,idProduct)=>{
    try {
        const response=await cartDao.updateQuantityCart(quantity,idCart,idProduct);
        if(!response || isNaN(quantity))return false;
        return response;
    } catch (error) {
        response.status(500)
    }
}
export const deleteProductFromCart=async(idCart,idProduct)=>{
    try {
        const carts=await cartDao.getCartById(idCart);
        if(!carts)return false;
        const response=await cartDao.deleteProductFromCart(idCart, idProduct);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateCart=async(array,idCart)=>{
    try {
        
        const response=await cartDao.updateCart(array,idCart)
        if(!response)return false;
        return response
        
    } catch (error) {
        console.log(error);
    }
}
export const deleteAllProductToCart=async(idCart)=>{
    try {
        const response=await cartDao.deleteAllProductToCart(idCart)
        if (!response ) return false ;
        return response;
    } catch (error) {
        console.log(error);
    }
}