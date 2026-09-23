const userModel=require('../models/userModel');
const ownerModel=require('../models/ownerModel');

const account=async (req,res)=>{
    let user=await userModel.findOne({email:req.user.email});
    let owner=await ownerModel.findOne({email:req.user.email});
    let isAdmin=!!owner;
    const profile=user||owner;
    res.render('account',{profile,isAdmin});

}

module.exports={
    account,
}