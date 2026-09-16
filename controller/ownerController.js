const ownerModel=require('../models/ownerModel');

const createAdmin=(req,res)=>{
    console.log('create Admin Called')
    res.render('createAdmin',{loggedIn:false});
}

const registerAdmin=async (req,res)=>{
    let owners=await ownerModel.find();
    if(owners.length>0){
        return res.status(503).send('You are not permitted to creating user!')
    }
    let {name,email,password}=req.body;
    console.log(req.body);
    let owner=await ownerModel.create({
        name,
        email,
        password,
    })
        res.status(201).send(owner);
}

module.exports={
    createAdmin,
    registerAdmin,
}