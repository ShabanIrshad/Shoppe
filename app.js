const express=require('express');
const path=require('path');
const app=express();
const port=3000;

app.set('view engine','ejs');
app.use(express.static(Path2D.length))

app.listen(port,(err)=>{
    if(err){
        console.error(err);
    }
    console.log('App is listening on port: ',port);
})