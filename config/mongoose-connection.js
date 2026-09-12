const mongoose=require('mongoose');
const dbgr=require('debug')("development:mongoose");
const config=require('config');

mongoose.connect(`${config.get("MONGODB_URI")}/shoppe`).then(()=>dbgr('Connected!')).catch((err)=>{
    dbgr(err);
})

module.export=mongoose.connection;