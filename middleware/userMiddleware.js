
const userModel=require('../models/userModel');
const ownerModel=require('../models/ownerModel');

const checkRegister=async (req,res,next)=>{
    let {email,password,name}=req.body;
    let presented=await userModel.findOne({email});
    
   
    if(email.trim()==='' || password.trim()==='' || name.trim()===''){
        req.flash('error','Please fill required fields.');        
        return res.render('index',{error:req.flash('error'),loggedIn:false});
    }else if(name.trim().length<3 || email.trim().length<3){
        req.flash('error','Name and Email must be greater that 3 characters.');        
        return res.render('index',{error:req.flash('error'),loggedIn:false});
    }else if(presented){
        req.flash('error','User Already Present !');        
        return res.render('index',{error:req.flash('error'),loggedIn:false});
    }else{
        next();
    }
}

const checkUser=async (req,res,next)=>{
    let {email,password}=req.body;
    let user=await userModel.findOne({email});
    let owner=await ownerModel.findOne({email})
    let account=user||owner?true:false;
    
    if(email.trim()==='' || password.trim()===''){
        req.flash('error','Please fill required fields.');        
        return res.render('index',{error:req.flash('error'),loggedIn:false});    
    }else if(!account){
        req.flash('error','Account not found !');        
        return res.render('index',{error:req.flash('error'),loggedIn:false});
    }else{
        next();
    }
}
module.exports={
    checkUser,checkRegister,
}

