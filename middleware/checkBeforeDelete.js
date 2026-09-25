const ownerModel=require('../models/ownerModel');

const checkBeforeDelete=async (req,res)=>{
    console.log('in Check Before Delete');
    next();
} 
export default checkBeforeDelete;