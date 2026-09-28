const mongoose=require('mongoose');
const dbgr=require('debug')("development:mongoose");
require('dotenv').config();

mongoose.connect(`${process.env.MONGODB_URI}/shoppe`)
.then(()=>dbgr('Connected!')).catch((err)=>{
    dbgr(err);
})

module.exports=mongoose.connection;