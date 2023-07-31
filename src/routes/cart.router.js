import { Router } from 'express';
import * as controller from '../controllers/cart.controller.js'
const router=Router();


router.get('/',controller.getAllController)
router.get('/:id',controller.getByidController)
router.post('/',controller.createController)
router.post('/:idCart/products/:idProduct',controller.productAddCartController)
router.delete('/:cid/products/:pid',controller.deleteProductFromCart)
router.delete('/:cid',controller.deleteAllProductToCart)
router.put('/:cid',controller.updateCart)
router.put('/:cid/products/:pid',controller.updateQuantityCart)
export default router;