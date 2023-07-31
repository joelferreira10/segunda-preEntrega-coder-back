import { productModel } from "./models/product.model.js";

export default class ProductDaoMongoDB{
    
    async getAll(
        limit = 10,
        page = 1,
        category,
        sort="asc"
        ){
        try {
        if (!limit) limit = 10;
         let query = {};

        if ( category ) {
           query.category=category
        }

        let sortOrder;
        if ( sort === 'desc' ) {
            sortOrder = -1;
        } else {
            sortOrder = 1;
        }
        const response = await productModel.paginate( query,
            {
                limit: limit,
                page: page,
                sort:{price:sortOrder}
            }
        );
        return response;
            
        } catch (error) {
            console.log(error)
        }
        
    }
    async getByName(prodName){
        try {
            const products = await productModel.find({name:prodName}).explain();
            return products.executionStats
        } catch (error) {
            console.log(error)
        }
        
    }
    async createProduct(obj){
        try {
            const response=await productModel.create(obj)
            return response 
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id){
        try {
            const response=await productModel.findById(id)
            return response;
        } catch (error) {
            console.log(error)
        }
        
    }

    async updateProduct(id,obj){
        try {
            const response=await productModel.findByIdAndUpdate(id,obj,{new:true})   
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async deleteproduct(id){
        try {
            const response=await productModel.findByIdAndDelete(id)   
            return response
        } catch (error) {
            console.log(error)
        }
    }
}
