const userModel=require('../models/userModel');
const ownerModel=require('../models/ownerModel');

const account=async (req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate('orders');
    let owner=await ownerModel.findOne({email:req.user.email}).populate('products');
    let isAdmin=!!owner;
    const profile=user||owner;
   
    console.log(profile);
    res.render('account',{profile,isAdmin});

}

module.exports={
    account,
}