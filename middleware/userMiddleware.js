

const checkUser=async (req,res,next)=>{
    let {email,password}=req.body;
   
    if(email.trim()==='' || password.trim()===''){
        req.flash('error','Please fill required fields.');        
        return res.render('index',{error:req.flash('error'),loggedIn:false});
    }else{
        next();
    }
}
module.exports={
    checkUser,
}

