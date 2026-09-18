const express=require('express');
const router=express.Router();
const upload=require('../config/multer-config');
const {createProduct}=require('../controller/productController');
const isLoggedIn=require('../middleware/isLoggedIn');

router.post('/create',upload.single('image'),isLoggedIn,createProduct)

router.get('/create',isLoggedIn,(req,res)=>{
    
    req.flash('success','');
    res.render('createproducts',{success:req.flash('success')})
});
router.get('/products/all',isLoggedIn,)

module.exports=router;