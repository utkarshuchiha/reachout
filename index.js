const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose');
const port=8000;
const app=express();

//read the data send 
app.use(express.urlencoded());
//reading cookies
app.use(cookieParser());

//tell the app to use layouts done before rendering any views
app.use(expressLayouts);
//set the statics 
app.use(express.static('./assets'));
//extract style and script from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//use express router defined in routes/index.js 
//middleware
app.use('/',require('./routes'));
//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`ERROR:${err}`);
    }
    console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});