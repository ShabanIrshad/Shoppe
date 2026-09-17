const productModel=require('../models/productModel');
const createProduct=async (req,res)=>{
     try {
        let {name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
        let product=await productModel.create({
            image:req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        })
        req.flash('success',' Product created !')
        res.redirect('/shop'); 
    } catch (error) {
        res.send(error.message);
    }
}
module.exports={
    createProduct,
}