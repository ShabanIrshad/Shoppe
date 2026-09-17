const userModel=require('../models/userModel');
const ownerModel=require('../models/ownerModel');
const productModel=require('../models/productModel');
const bcrypt=require('bcrypt');
const {generateToken}=require('../middleware/generateToken');

module.exports.loginUser=async (req,res)=>{
    let {email,password}=req.body;
    let user=await userModel.findOne({email});
    let owner=await ownerModel.findOne({email});
    let products=await productModel.find();
    let putPassword=user?user.password:owner.password;
    let putProfile=user?user:owner;
    if(putPassword){
         bcrypt.compare(password,putPassword,(err,result)=>{
        if(result){
            let token=generateToken(putProfile);
            res.cookie("token",token);
            req.flash("success",`${user?'User':'Admin'} Login Successfully!`);
            res.render('shop',{owner:owner,products})
        }else{
            req.flash('error','Password Wrong');
             return  res.render('index',{error:req.flash('error'),loggedIn:false});
            // res.redirect('/');
        }
        })
    } else{
            
            req.flash('error','Email Or Password Wrong');
            // res.status(404).redirect('/');
           return  res.render('index',{error:req.flash('error'),loggedIn:false});
    }
   
}

module.exports.registerUser=async (req,res)=>{
    
    try {
         let {email,password,name}=req.body;
        //  let presented=await userModel.findOne({email});
        //  if(presented){
        //     return res.status(404).send('Already user present!')
        //  }
         bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async (err,result)=>{
                if(err) return res.send(err.message);
                else{
                    let user=await userModel.create({
                        name,
                        email,
                        password:result,
                    })
                    let token=generateToken(user)
                    res.cookie("token",token);
                    req.flash('success','User Login Successfully !');
                    res.redirect('/shop');
                    // res.send("User Created!");
                }
            })
         })
         
    } catch (err) {
        console.log(err.message);
    }  
}

module.exports.logout=(req,res)=>{
    res.cookie('token',"");
    res.redirect('/');
}
