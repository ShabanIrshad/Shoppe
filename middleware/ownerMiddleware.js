const userModel=require('../models/userModel');
const ownerModel=require('../models/ownerModel');


const checkAdmin=async (req,res,next)=>{
    let {email}=req.body;
    let owner=await ownerModel.find({email});
    let user=await userModel.find({email});
    if(user.length>0 || owner.length>0){
        req.flash('error','Email Already Exists!');        
        return res.render('createAdmin',{error:req.flash('error')});
       
    }else{
        next();
    }
}

module.exports={
    checkAdmin,
}