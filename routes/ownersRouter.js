const express=require('express');
const router=express.Router();
const ownerModel=require('../models/ownerModel');
const {createAdmin,registerAdmin}=require('../controller/ownerController');


router.post('/create',registerAdmin)


router.get('/create',createAdmin);

router.get('/',(req,res)=>{
    res.send('Owner Router called /')
})

router.get('/admin',(req,res)=>{
    let success=req.flash('success');
    res.render('createproducts',{success})
})


module.exports=router;