const userModel=require('../models/userModel');
const bcrypt=require('bcrypt');
const flash=require('connect-flash');
const jwt=require('jsonwebtoken');
const {generateToken}=require('../middleware/generateToken');

module.exports.loginUser=async (req,res)=>{
    let {email,password}=req.body;
    let user=await userModel.findOne({email});
    if(user){
         bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token=generateToken(user);
            res.cookie("token",token);
            req.flash("success",'User Login Successfully!');
            // res.render('shop',{success:req.flash('success')})
            res.redirect('/shop')
        }else{
            let error=req.flash('error','Email Or Password Wrong');
            res.redirect('/',{error});
        }
        })
    } else{
            req.flash('error','Email Or Password Wrong');
           return  res.render('index',{error:req.flash('error')});
    }
   
}

module.exports.registerUser=async (req,res)=>{
    
    try {
         let {email,password,name}=req.body;
         let presented=await userModel.findOne({email});
         if(presented){
            res.status(404).send('Already user present!')
         }
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
                    console.log(user);
                    res.send("User Created!");
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
