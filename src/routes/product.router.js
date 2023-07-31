import { Router } from "express";
import { getAllController,
    getByIdController,
    createController,
    updateController,
    deleteController,getByNameControler } from "../controllers/product.controller.js";
const router=Router()

router.get('/',getAllController)
router.get('/:id',getByIdController)
router.get('/prod/:prodName',getByNameControler)
router.post('/',createController)
router.put('/:id',updateController)
router.delete('/:id',deleteController)


export default router