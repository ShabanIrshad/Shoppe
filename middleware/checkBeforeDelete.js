const ownerModel=require('../models/ownerModel');

 const checkBeforeDelete=async (req,res,next)=>{
    const adminProducts = req.user.products;

    const hasProduct = adminProducts.some(product =>
        product.equals(req.params.id)
    );

    if (!hasProduct) {
        req.flash('success','You are not Authorized!');
        return res.status(403).json({ message: "Product does not belong to this owner." });
    }

    next();
} 

module.exports=checkBeforeDelete;
