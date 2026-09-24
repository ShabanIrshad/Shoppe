const express=require('express');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
const ownerModel=require('../models/ownerModel');
const router=express.Router();
const flash=require('connect-flash');
const isLoggedIn=require('../middleware/isLoggedIn');
const countTotal=require('../middleware/countTotal');


router.get("/",(req,res)=>{
    let error=req.flash("error",'Something went wrong');
    res.render('index',{error,loggedIn:false});
})

router.get('/shop',isLoggedIn,async (req,res)=>{
    let products =await productModel.find();
    let owner=await ownerModel.findOne({email:req.user.email});    
    let user=await userModel.findOne({email:req.user.email});
    let cart=user.cart.length||0;
    let profile=user||owner;
    req.flash('success');
    res.render('shop',{products,owner,profile,cart});
})

router.get('/sortby',isLoggedIn,async (req,res)=>{   
    let selected=req.query.sortby;
    let user=await userModel.findOne({email:req.user.email});
    let cart=user.cart.length||0;
    let profile=user||owner;
    if(selected=='newest'){
        res.redirect('/products/newcollection');
    }else if(selected=='popular'){
        let products =await productModel.find({
            rating:{$gt:4}
        });
        let owner=await ownerModel.findOne({email:req.user.email});
        res.render('shop',{products,owner,profile,cart});
    }else{
         let products =await productModel.find();
        let owner=await ownerModel.findOne({email:req.user.email});
        res.render('shop',{products,owner,profile,cart});
    }
    

})

router.get('/available',isLoggedIn,async (req,res)=>{
    let products= await productModel.find({stock:{$gt:0}});
    let owner=await ownerModel.findOne({email:req.user.email});
    let user=await userModel.findOne({email:req.user.email});
    let cart=user.cart.length||0;
    let profile=user||owner;
    res.render('shop',{products,owner,profile,cart});
})

router.get('/discounted',isLoggedIn,async (req,res)=>{
    let products= await productModel.find().sort({discount:-1});
    let owner=await ownerModel.findOne({email:req.user.email});
    let user=await userModel.findOne({email:req.user.email});
    let cart=user.cart.length||0;
    let profile=user||owner;
    res.render('shop',{products,owner,profile,cart});
})

router.get('/cart',isLoggedIn,async (req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate('cart');
    let owner=await ownerModel.findOne({email:req.user.email});
    if(owner){
        req.flash('success','You can not buy products.');
        res.redirect('/shop');
        return;
    }
    let total=Number(countTotal(user.cart));
    let profile=user||owner;
    let cart=user.cart.length||0;
    res.render('cart',{user,total,profile,cart});
})

router.get('/order/:email',async (req,res)=>{
     let user=await userModel.findOne({email:req.params.email});
     let cartItems=await userModel.find({email:req.params.email}).populate('cart');
     user.orders=user.cart;
     user.cart=[];
     user.save();
     req.flash('success','Order Created Successfully');
     res.redirect('/cart');

})

router.get('/addtocart/:id',isLoggedIn,async (req,res)=>{
   
    let owner=await ownerModel.findOne({email:req.user.email});
    if(owner){
        req.flash('success','You can not buy products.');
        res.redirect('/shop');
        return;
    }
    let user =await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.id);
    await user.save();
    req.flash('success','Added to Cart!');
    res.redirect('/shop');
})





module.exports=router;