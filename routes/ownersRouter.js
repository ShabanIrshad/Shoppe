const express=require('express');
const router=express.Router();
const ownerModel=require('../models/ownerModel');

if(process.env.NODE_ENV==='development'){
        router.post('/create',async (req,res)=>{
        let owners=await ownerModel.find();
        if(owners.length>0){
            return res.status(503).send('You are not permitted to creating user!')
        }
        let {name,email,password}=req.body;
        console.log(req.body);
;        let owner=await ownerModel.create({
            name,
            email,
            password,
        })
         res.status(201).send(owner);
    })
}

router.get('/',(req,res)=>{
    res.send('Owner Router called /')
})



module.exports=router;