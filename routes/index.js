const express=require('express');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
const ownerModel=require('../models/ownerModel');
const router=express.Router();
const flash=require('connect-flash');
const isLoggedIn=require('../middleware/isLoggedIn');


router.get("/",(req,res)=>{
    let error=req.flash("error",'Something went wrong');
    res.render('index',{error,loggedIn:false});
})

router.get('/shop',isLoggedIn,async (req,res)=>{
    let products =await productModel.find();
    let owner=await ownerModel.findOne({email:req.user.email});
    req.flash('success');
    res.render('shop',{products,owner});
})

router.get('/sortby',isLoggedIn,async (req,res)=>{   
    let selected=req.query.sortby;
    console.log(selected);
    if(selected=='newest'){
        res.redirect('/products/newcollection');
    }else if(selected=='popular'){
        let products =await productModel.find({
            rating:{$gt:4}
        });
        console.log(products,"-------");
        let owner=await ownerModel.findOne({email:req.user.email});
        res.render('shop',{products,owner});
    }else{
         let products =await productModel.find();
        // console.log(products,"-------");
        let owner=await ownerModel.findOne({email:req.user.email});
        res.render('shop',{products,owner});
    }
    

})

router.get('/available',isLoggedIn,async (req,res)=>{
    let products= await productModel.find({stock:{$gt:0}});
    let owner=await ownerModel.findOne({email:req.user.email});
    res.render('shop',{products,owner});
})

router.get('/discounted',isLoggedIn,async (req,res)=>{
    console.log('got in');
    let products= await productModel.find().sort({discount:-1});
    let owner=await ownerModel.findOne({email:req.user.email});
    res.render('shop',{products,owner});
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