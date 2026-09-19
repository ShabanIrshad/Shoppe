const mongoose=require('mongoose');


const productSchema=mongoose.Schema({
   image:Buffer,
   name:String,
   price:Number,
   discount:{
            type:Number,
            default:0,
         },
    bgcolor:String,
    panelcolor:String,
    textcolor:String,
    rating:{
      type:Number,
      default:0,
    },
    stock:{
      type:Number,
      default:0,
    },
    Date:{
      type:Date,
      default:Date(),
    }
});

module.exports=mongoose.model('product',productSchema);