const userModel=require('../models/userModel');
const ownerModel=require('../models/ownerModel');


const checkAdmin=async (req,res,next)=>{
    let file=!!req.file;
    let {name,email,password,gstin}=req.body;
    let owner=await ownerModel.find({email});
    let user=await userModel.find({email});

    if(name.trim()=='' || email.trim()=='' || password.trim()==''){
        req.flash('error','Please fill all required fields.');
        return res.render('createAdmin',{error:req.flash('error'),loggedIn:false});
    }
    if(!file){
        req.flash('error','Please provide a picture.');
        return res.render('createAdmin',{error:req.flash('error'),loggedIn:false});
    }

    if(user.length>0 || owner.length>0){
        req.flash('error','Email Already Exists!');        
        return res.render('createAdmin',{error:req.flash('error'),loggedIn:false});
       
    }else{
        next();
    }
}

module.exports={
    checkAdmin,
}