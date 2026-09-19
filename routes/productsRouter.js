const express=require('express');
const router=express.Router();
const upload=require('../config/multer-config');
const {createProduct,discountedProducts,newCollection}=require('../controller/productController');
const isLoggedIn=require('../middleware/isLoggedIn');

router.post('/create',upload.single('image'),isLoggedIn,createProduct)

router.get('/create',isLoggedIn,(req,res)=>{
    
    req.flash('success','');
    res.render('createproducts',{success:req.flash('success')})
});
router.get('/discounted',isLoggedIn,discountedProducts);

router.get('/newcollection',isLoggedIn,newCollection);

module.exports=router;