const express=require('express');
const router=express.Router();
const upload=require('../config/multer-config');
const {createProduct,discountedProducts,newCollection,deleteItem}=require('../controller/productController');
const isLoggedIn=require('../middleware/isLoggedIn');
const checkBeforeDelete=require('../middleware/checkBeforeDelete');

router.post('/create',upload.single('image'),isLoggedIn,createProduct)

router.get('/create',isLoggedIn,(req,res)=>{
    req.flash('success','');
    res.render('createproducts',{user:req.user,success:req.flash('success')})
});
router.get('/discounted',isLoggedIn,discountedProducts);

router.get('/newcollection',isLoggedIn,newCollection);

router.get('/delete/:id',isLoggedIn,checkBeforeDelete,deleteItem);

module.exports=router;