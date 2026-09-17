const ownerModel=require('../models/ownerModel');
const userModel=require('../models/userModel');
const {generateToken}=require('../middleware/generateToken');
const bcrypt=require('bcrypt');

const createAdmin=(req,res)=>{
    console.log('create Admin Called')
    req.flash('error',"");
    res.render('createAdmin',{error:req.flash('error'),loggedIn:false});
}

const registerAdmin=async (req,res)=>{
    let {name,email,password,gstin}=req.body;   
    
     bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,result)=>{
            if(err) return res.send(err.message);
            else{
                 let owner=await ownerModel.create({
                    name,
                    email,
                    password:result,
                    gstin,
                    picture:req.file.buffer,
                    
                })
                let token=generateToken(owner)
                res.cookie("token",token);
                req.flash('success','Owner Login Successfully !');
                res.redirect('/shop');
                // res.send("User Created!");
            }
        })
    })
    
    req.flash('error','Owner Created Successfully !');
    res.render('index',{error:req.flash('error'),loggedIn:false});
    // res.status(201).redirect('/');
}

module.exports={
    createAdmin,
    registerAdmin,
}