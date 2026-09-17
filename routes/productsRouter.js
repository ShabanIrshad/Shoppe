const express=require('express');
const router=express.Router();
const upload=require('../config/multer-config');
const {createProduct}=require('../controller/productController');

router.post('/create',upload.single('image'),createProduct)

router.get('/create',(req,res)=>{
    
    req.flash('success','');
    res.render('createproducts',{success:req.flash('success')})
});

module.exports=router;