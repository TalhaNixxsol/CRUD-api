const controller=require('../controller/controller');
const middle=require('../middleware/middleware')
const express=require('express');
const router=express.Router();
router.post('/signup',controller.signup);
router.post('/login',controller.login);
router.post('/addproduct',middle.productimage.single('product'),controller.addproduct)
router.get('/getproduct',controller.getproduct);
router.delete('/delete',controller.delete);
router.put('/update',controller.update)
module.exports=router; 