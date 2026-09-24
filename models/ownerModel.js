const mongoose=require('mongoose');

const ownerSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        minLength:3,
    },
    email:String,
    password:String,  
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
    } ],
    gstin:String,
    picture:Buffer,

});

module.exports=mongoose.model('owners',ownerSchema);