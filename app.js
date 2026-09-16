const cookieParser = require('cookie-parser');
const express=require('express');
const path=require('path');
const app=express();
const db=require('./config/mongoose-connection');
const ownersRouter=require('./routes/ownersRouter');
const userRouter=require('./routes/userRouter');
const flash=require('connect-flash');
const indexRouter=require('./routes/index');
const expressSession=require('express-session');
const productsRouter=require('./routes/productsRouter');
require('dotenv').config();
const port=3000;

app.set('view engine','ejs');
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,
}))

app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use('/',indexRouter);
app.use("/owners",ownersRouter);
app.use("/users",userRouter);
app.use("/products",productsRouter);



app.listen(port,(err)=>{
    if(err){
        console.error(err);
    }
    console.log('App is listening on port: ',port);
})