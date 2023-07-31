import mongoose from "mongoose";
import './connection.js'
import { cartsModel } from "./models/carts.model.js";
import ProductDaoMongoDB from './product.dao.js';

const productDao=new ProductDaoMongoDB();
export default class CartsDaoMongoDB{

    async getAll(){
        try {
            const response=await cartsModel.find();
            return response;
        } catch (error) {
            console.log(error);
        }
        
    }

    async createCart(){
        try {
            const response=await cartsModel.create({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(id){
        try {
            const response=await cartsModel.findById(id).populate('products.id')
            return response;
        } catch (error) {
            console.log(error)
        }
    }
    async addProductCart(idCart,idProduct){
        try {
            const carts=await cartsModel.findById(idCart);
           const productCart=carts.products.find(prod=>prod.id.equals(idProduct));
           
            if(productCart){
                productCart.quantity++;
            }else{
                carts.products.push({id:idProduct,quantity:1});
            }
            carts.save();
            return carts;
           }
           
             catch (error) {
            console.log(error)
        }
    }

    async updateCart(array,idCart){
        try {
            let cart=await cartsModel.findById(idCart)
            if (!cart) return false
            cart.products=array;
            cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
    async updateQuantityCart(quantity,idCart,idProduct){
        try {
           
            const cart=await cartsModel.findById(idCart)
            const findProd=cart.products.findIndex(prod=>prod.id.equals(idProduct))
            if(!cart || findProd===-1 || isNaN(quantity))return false
            
            cart.products[findProd].quantity=quantity;
            cart.save();
            return cart
            
            
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCart(idCart, idProduct){
        try {
            const cartId=await cartsModel.findById(idCart)
            const productCart=cartId.products.filter(prod=>prod.id.equals(idProduct))
            if(productCart){
                const cart = await cartsModel.findByIdAndUpdate(
                    idCart, 
                    { $pull: { products: { id: idProduct } } },
                    { new: true, useFindAndModify: false } 
                );
                return cart;
            }else return false;
            
           
            
        } catch (error) {
            console.log(error);
        }
    }
    async deleteAllProductToCart(idCart){
        try {
            let cart=await cartsModel.findById(idCart)
            const lengtProd=cart.products.length;
            console.log(cart.products.length);
            if(!cart)return false;
            cart.products.splice(0,lengtProd);
            await cart.save()
            return cart
        } catch (error) {
            console.log(error);
        }
    }
}

// const manager=new CartsDaoMongoDB()
// async function test() {
//     await manager.updateQuantityCart(5,"64c70f5555cc26594afcff3e","64c70b27f83f577197d3697d")
// }

// test()