const express=require('express');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
const router=express.Router();
const flash=require('connect-flash');
const isLoggedIn=require('../middleware/isLoggedIn');


router.get("/",(req,res)=>{
    let error=req.flash("error",'Something went wrong');
    res.render('index',{error,loggedIn:false});
})

router.get('/shop',isLoggedIn,async (req,res)=>{
    let products =await productModel.find();
    req.flash('success');
    res.render('shop',{products});
})

router.get('/cart',isLoggedIn,async (req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate('cart');
    console.log(user);
    let total=Number(user.cart[0].price+20-user.cart[0].discout);
    res.render('cart',{user,total});
})

router.get('/addtocart/:id',isLoggedIn,async (req,res)=>{
    let user =await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.id);
    await user.save();
    res.flash('success','Added to Cart!');
    res.redirect('/shop');
})

router.get('/logout',isLoggedIn,(req,res)=>{
    res.render('shop');
})




module.exports=router;