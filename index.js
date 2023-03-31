const express=require('express');
const port=8000;
const app=express();

app.listen(port,function(err){
    if(err){
        console.log(`ERROR:${err}`);
    }
    console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});