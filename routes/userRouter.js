const express=require('express');
const router=express.Router();
const {registerUser,loginUser,logout}=require('../controller/authController');
const {checkUser}=require('../middleware/userMiddleware');

router.get("/",(req,res)=>{
    res.render('index');
})

router.post("/register",registerUser);

router.post('/login',checkUser,loginUser);

router.get('/logout',logout);

module.exports=router;