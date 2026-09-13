const express=require('express');
const router=express.Router();
const upload=require('../config/multer-config');

router.get('/create',(req,res)=>{
    res.send('Product Router called /')
})

module.exports=router;