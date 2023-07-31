import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";

const productDao=new ProductDaoMongoDB();

export const getAllService=async(limit,page,category,sort )=>{
    try {
        
        const response=await productDao.getAll(limit,page,category,sort);
        if(!response)return response;
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getByIdService=async(id)=>{
    try {
        const response=await productDao.getProductById(id)
        if(!response)return false
        return response
    } catch (error) {
        console.log(error)
    }
}

export const createService=async(obj)=>{
    try {
        const response=await productDao.createProduct(obj)
        if(!response)return false;
        return response;
    } catch (error) {
        console.log(error)
    }
}
export const getByNameService=async(prodName)=>{
    try {
        const response=await productDao.getByName(prodName);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateService=async(id,obj)=>{
    try {
        const response=await productDao.updateProduct(id,obj)
        if(!response)return false;
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const deleteService=async(id)=>{
    try {
        const response=await productDao.deleteproduct(id)
        if(!response)return false;
        return response;
    } catch (error) {
        console.log(error)
    }
}