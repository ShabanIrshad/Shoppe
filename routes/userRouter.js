const express=require('express');
const router=express.Router();
const {registerUser,loginUser,logout}=require('../controller/authController');

router.get("/",(req,res)=>{
    console.log('index ka router / get')
    res.render('index');
})

router.post("/register",registerUser);

router.post('/login',loginUser);

router.get('/logout',logout);

module.exports=router;