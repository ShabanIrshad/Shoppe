const cookieParser = require('cookie-parser');
const express=require('express');
const path=require('path');
const app=express();
const db=require('./config/mongoose-connection');
const ownersRouter=require('./routes/ownersRouter');
const userRouter=require('./routes/userRouter');
const productsRouter=require('./routes/productsRouter');
const port=3000;

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use("/owners",ownersRouter);
app.use("/user",userRouter);
app.use("/products",productsRouter);

app.listen(port,(err)=>{
    if(err){
        console.error(err);
    }
    console.log('App is listening on port: ',port);
})