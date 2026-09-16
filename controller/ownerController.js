const ownerModel=require('../models/ownerModel');
const userModel=require('../models/userModel');

const createAdmin=(req,res)=>{
    console.log('create Admin Called')
    res.render('createAdmin',{loggedIn:false});
}

const registerAdmin=async (req,res)=>{
    let {name,email,password,gstin}=req.body;   
    let owner=await ownerModel.create({
        name,
        email,
        password,
        gstin,
        picture:req.file.buffer,
        
    })
        res.status(201).send(owner);
}

module.exports={
    createAdmin,
    registerAdmin,
}