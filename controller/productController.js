const productModel=require('../models/productModel');
const userModel=require('../models/userModel');
const ownerModel=require('../models/ownerModel');

const createProduct=async (req,res)=>{
     try {
        let owner=await ownerModel.findOne({email:req.user.email});
        let {name,price,discount,bgcolor,panelcolor,textcolor,rating,stock}=req.body;
        let product=await productModel.create({
            image:req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            rating,
            stock,
        })
        owner.products.push(product._id);
        owner.save();
        req.flash('success',' Product created !')
        res.redirect('/shop'); 
    } catch (error) {
        res.send(error.message);
    }
}

const discountedProducts=async (req,res)=>{
    let products=await productModel.find({
        discount:{$gt:0}
    })
    let owner=await ownerModel.findOne({email:req.user.email});
    let user=await userModel.findOne({email:req.user.email});
   let cart=(user)?user.cart.length:0;
        let profile=user||owner;
    res.render('shop',{products,owner,profile,cart});
}

const deleteItem=async (req,res)=>{
    let {id}=req.params;
    //deleting from user/owner docs let admindProducts=req.user.products;
    let filtered=req.user.products.filter(product=>product.toString()!==id);
    req.user.products=filtered;
    await req.user.save();
    
    //deleting from products collection
    let product=await productModel.findByIdAndDelete(id);
    req.flash('success','Product Deleted !')
    res.redirect('/shop');
}


const newCollection=async (req,res)=>{
    let products=await productModel.find().sort({Date:-1})
    let owner=await ownerModel.findOne({email:req.user.email});
    let user=await userModel.findOne({email:req.user.email});
    let cart=(user)?user.cart.length:0;
    let profile=user||owner;
    res.render('shop',{products,owner:owner,profile,cart});
}

module.exports={
    createProduct,
    discountedProducts,
    newCollection,
    deleteItem,
}