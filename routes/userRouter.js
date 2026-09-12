const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('User Router called /')
})

module.exports=router;