const express=require('express');
const port=8000;
const app=express();

//use express router defined in routes/index.js 
//middleware
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`ERROR:${err}`);
    }
    console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});