import { getAllService,
    getByIdService,
    createService,
    updateService,
    deleteService,getByNameService } from "../services/product.services.js";
import { errorHandler } from "../middlewares/errorHandler.js";

export const getAllController=async(req,res)=>{
    try {
        
        const {limit,page,category,sort}=req.query;
        console.log(limit,page);
        const response=await getAllService(limit,page,category,sort);
        const next=response.hasNextPage?`http://localhost:8080/api/products?page=${response.nextPage}` : null;
        const prev=response.hasPrevPage?`http://localhost:8080/api/products?page=${response.prevPage}` : null;
        const status=response?'success':'error'
        res.status(200).json({
            info:{
            status,
            totalPages:response.totalPages,
            page:response.page,
            pagePrev:response.pagePrev,
            pageNext:response.pageNext,
            next,
            prev,
            hasPrevPage:response.hasPrevPage,
            hasNextPage:response.hasNextPage
            },
            result:{
                docs:response.docs
            }
            
        })
    } catch (error) {
        console.log(error)
    }
}
export const getByNameControler=async(req,res)=>{
    try {
        const {prodName}=req.params;
        console.log(prodName);
        const nameId=await getByNameService(prodName);
        if(!nameId)return res.json({"error":"name no found"})
        return  res.json({"data":nameId})
    } catch (error) {
        
    }
}
export const getByIdController=async(req,res)=>{
    try {
       const {id}=req.params;
       console.log(id)
       const prod=await getByIdService(id)
       if (!prod)return res.status(404).json({message:"prod not found"})
        res.json(prod)
    }catch(error){
        console.log(error)
    }
}

export const createController=async(req,res)=>{
    try {
        const {title,description,code,price,stock,category,thumbnails}=req.body
        if(!title || !description || !price|| !stock || !code || !category)return res.status(404).json({message:"Vaditation Error!"})
        const obj={
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails
        }
        const newProd=await createService(obj);
        res.status(200).json(newProd);
    } catch (error) {
        console.log(error)
    }
}

export const updateController=async(req,res)=>{
    try {
        const {id}=req.params;
        const{name,description,price,stock}=req.body;
        if(!name || !description || !price|| !stock)return res.status(404).json({message:"Vaditation Error!"})
        const updateUser=await updateService(id,req.body);
        if(!updateUser)return res.status(404).json({message:"ID not found"})
        res.json(updateUser)
    } catch (error) {
        console.log(error)
    }
}

export const deleteController=async(req,res)=>{
    try {
        const {id}=req.params;
        const deleteUser=await deleteService(id,req.body);
        if(!deleteUser)res.status(404).json({message:"ID not found"})
        res.json(deleteUser)
    } catch (error) {
        console.log(error)
    }
}